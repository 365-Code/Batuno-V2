"use client";
import { useAuth } from "@/context/AuthState";
import { UserType } from "@/utils";
import { db } from "@/utils/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React from "react";

type MakeCallProps = {
  requestTo: string;
  callMode?: "video" | "audio";
};

const MakeCall = ({ requestTo, callMode }: MakeCallProps) => {
  const { currentUser, setCurrentUser } = useAuth();

  async function makeCallRequest() {
    if (currentUser.onCall) return;

    const roomId = crypto.randomUUID();

    const chatRef = doc(db, "users", requestTo);
    const userRef = doc(db, "users", currentUser.uid);

    try {
      const result = await getDoc(chatRef);

      await updateDoc(userRef, {
        request: {
          status: "waiting",
          roomId,
          callerName: currentUser.username,
          sender: currentUser.uid,
          receiver: requestTo,
          date: Timestamp.now(),
        },
      });
      if (!result.exists()) {
        await setDoc(chatRef, {
          logs: [
            {
              status: "waiting",
              roomId,
              callerName: currentUser.username,
              sender: currentUser.uid,
              receiver: requestTo,
              date: Timestamp.now(),
            },
          ],
        });
      } else {
        await updateDoc(chatRef, {
          logs: arrayUnion({
            status: "waiting",
            callerName: currentUser.username,
            roomId,
            receiver: requestTo,
            sender: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      return error;
    } finally {
      setCurrentUser((prev: UserType) => ({
        ...prev,
        onCall: true,
        callType: callMode || "audio",
      }));
    }
  }

  return (
    <button onClick={makeCallRequest}>
      {callMode == "video" ? (
        <i className="fi fi-sr-video-camera-alt p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer" />
      ) : (
        <i
          className={`fi fi-sr-phone-flip rotate-90 p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer`}
        />
      )}
    </button>
  );
};

export default MakeCall;
