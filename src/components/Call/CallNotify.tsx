import { useAuth } from "@/context/AuthState";
import { requestType, UserType } from "@/utils";
import { db } from "@/utils/firebase";
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

type CallNotifyProps = {
  chatId: string;
  senderId: string;
  recvId: string;
  callerName: string;
  roomId: string;
};

const CallNotify = ({
  chatId,
  senderId,
  recvId,
  roomId,
  callerName,
}: CallNotifyProps) => {
  const { setCurrentUser } = useAuth();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function playSound(url: string) {
    // const audio = new Audio(url);
    audioRef.current = new Audio(url);
    audioRef.current.volume = 0.3;
    audioRef.current.play();
  }

  async function hangup() {
    const chatRef = doc(db, "chats", chatId);
    const senderRef = doc(db, "users", senderId);
    const recvRef = doc(db, "users", recvId);
    try {
      await updateDoc(chatRef, {
        logs: arrayUnion({
          from: senderId,
          status: "rejected",
          callTime: Timestamp.now()
        }),
      });
      const recvRes = await getDoc(recvRef);
      if (recvRes.exists()) {
        const updatedLogs = (recvRes.data().logs as Array<requestType>)?.filter(
          (log) => log.sender != senderId
        );
        await updateDoc(recvRef, {
          logs: updatedLogs,
        });
      }
      const senderRes = await getDoc(senderRef);
      if (senderRes.exists()) {
        const updatedReq = senderRes.data().request as requestType;
        updateDoc(senderRef, {
          request: {
            ...updatedReq,
            status: "rejected",
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      playSound("message.mp3");
    }
  }

  async function answer() {
    const chatRef = doc(db, "chats", chatId);
    const senderRef = doc(db, "users", senderId);
    const recvRef = doc(db, "users", recvId);
    try {
      await updateDoc(chatRef, {
        logs: arrayUnion({
          from: senderId,
          status: "accepted",
          callTime: Timestamp.now()
        }),
      });
      const recvRes = await getDoc(recvRef);
      if (recvRes.exists()) {
        const updatedLogs = (recvRes.data().logs as Array<requestType>)?.filter(
          (log) => log.sender != senderId
        );
        await updateDoc(recvRef, {
          logs: updatedLogs,
        });
      }
      const senderRes = await getDoc(senderRef);
      if (senderRes.exists()) {
        const updatedReq = senderRes.data().request as requestType;
        updateDoc(senderRef, {
          request: {
            ...updatedReq,
            status: "accepted",
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUser((prev: UserType) => ({
        ...prev,
        onCall: true,
        call: {
          roomId,
          requestFrom: senderId,
          requestTo: recvId,
        },
      }));
    }
  }

  const [repeat, setRepeat] = useState(1);

  useEffect(() => {
    if (repeat <= 4) {
      playSound("tune.mp3");
      setTimeout(() => {
        setRepeat(repeat + 1);
      }, 7000);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [repeat]);

  return (
    <div className="p-4 absolute bottom-4 right-4 bg-[#151b28] shadow shadow-white/30 max-w-full w-fit rounded-lg text-left slide-left">
      {/* <img
        src="/logo.jpg"
        alt="logo"
        className="mx-auto w-[80px] h-[80px] object-cover object-center rounded-xl"
      /> */}
      <div>
        <p className="text-xs text-gray-500">Incoming Call</p>
        <h2>{callerName}</h2>
      </div>
      <div className="flex justify-center items-center gap-x-2 mt-2">
        <button
          onClick={answer}
          className="hover:bg-green-600 rounded-lg min-w-fit px-3 py-1 bg-green-500 flex items-center gap-x-2"
        >
          <i className="fi fi-sr-phone-call animate-phone-ring" />
          Answer
        </button>
        <button
          onClick={hangup}
          className="hover:bg-red-600 rounded-lg min-w-fit px-3 py-1 bg-red-500 flex items-center gap-x-2"
        >
          <i className="fi fi-sr-circle-phone-hangup" />
          <span>EndCall</span>
        </button>
      </div>
    </div>
  );
};

export default CallNotify;
