"use client";
import { useAuth } from "@/context/AuthState";
import { requestType, UserType } from "@/utils";
import { db } from "@/utils/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";

const OnCall = ({ id, name }: { id: string; name: string }) => {
  const { currentUser, setCurrentUser } = useAuth();

  async function handleMissed() {
    const combineId =
      currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
    const chatRef = doc(db, "chats", combineId);
    const userRef = doc(db, "users", currentUser.uid);
    const chatUserRef = doc(db, "users", id);
    try {
      const userRes = await getDoc(userRef);
      if (userRes.exists()) {
        const request = userRes.data().request;
        if (request && request.status == "waiting") {
          const result = await getDoc(chatUserRef);
          if (!result.exists()) throw new Error("user not found");
          const logs = result.data().logs as Array<{
            roomId: string;
            sender: string;
          }>;
          const updatedLogs = logs.filter(
            (log) => log.sender != currentUser.uid
          );
          await updateDoc(chatUserRef, {
            logs: updatedLogs,
          });
          await updateDoc(userRef, {
            request: null,
          });

          await updateDoc(chatRef, {
            logs: arrayUnion({
              from: currentUser.uid,
              status: "missed",
              callTime: Timestamp.now(),
            }),
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUser((prev: UserType) => ({ ...prev, onCall: false }));
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleMissed();
    }, 30000);

    return () => clearTimeout(debounce);
  }, []);

  function playSound(url: string) {
    const audio = new Audio(url);
    audio.volume = 0.3;
    audio.play();
  }

  async function handlehangup() {
    const combineId =
      currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
    const chatRef = doc(db, "chats", combineId);
    const userRef = doc(db, "users", currentUser.uid);
    const chatUserRef = doc(db, "users", id);
    try {
      const result = await getDoc(chatUserRef);
      if (!result.exists()) throw new Error("user not found");
      const logs = result.data().logs as Array<{
        roomId: string;
        sender: string;
      }>;
      const updatedLogs = logs.filter((log) => log.sender != currentUser.uid);
      await updateDoc(chatUserRef, {
        logs: updatedLogs,
      });
      await updateDoc(userRef, {
        request: null,
      });
      await updateDoc(chatRef, {
        logs: {
          from: currentUser.uid,
          status: "hangup",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      playSound("message.mp3");
      setCurrentUser((prev: UserType) => ({ ...prev, onCall: false }));
    }
  }

  const unsub = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    try {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const request = doc.data().request as requestType;
          if (!request || request.status == "waiting") return;
          else if (request.status == "accepted") {
            setCurrentUser((prev: UserType) => ({
              ...prev,
              onCall: true,
              call: {
                roomId: request.roomId,
                requestFrom: request.sender,
                requestTo: request.receiver,
              },
            }));
          } else if (request.status == "rejected") {
            playSound("message.mp3");
            setCurrentUser((prev: UserType) => ({
              ...prev,
              onCall: false,
              call: null,
            }));
            updateDoc(userRef, {
              request: null,
            });
          }
        }
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    unsub();
  }, [currentUser.uid]);

  return (
    <div className="p-4 absolute bottom-4 right-4 bg-[#151b28] shadow shadow-white/30 max-w-full w-fit rounded-lg text-left slide-left z-30">
      {/* <img
            src="/logo.jpg"
            alt="logo"
            className="mx-auto w-[80px] h-[80px] object-cover object-center rounded-xl"
          /> */}
      <div>
        <p className="text-xs text-gray-500">Calling</p>
        <h2>{name}</h2>
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={handlehangup}
          className="hover:bg-red-600 rounded-lg min-w-fit px-3 py-1 bg-red-500 flex items-center gap-x-2"
        >
          <i className="fi fi-sr-circle-phone-hangup" />
          <span>EndCall</span>
        </button>
      </div>
    </div>
  );
};

export default OnCall;
