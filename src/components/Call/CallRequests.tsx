"use client";
import { useAuth } from "@/context/AuthState";
import React, { useEffect, useState } from "react";
import CallNotify from "./CallNotify";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { requestType } from "@/utils";

const CallRequests = () => {
  const { currentUser } = useAuth();

  const [requests, setRequests] = useState<Array<requestType>>([]);

  const unsub = async () => {
    try {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.exists()) {
          const requests = doc.data().logs as Array<requestType>;
          setRequests(requests);
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
    <div>
      {requests?.map(
        (req) =>
          req.sender != currentUser.uid && (
            <CallNotify
              key={req.roomId}
              recvId={currentUser.uid}
              senderId={req.sender}
              callerName={req.callerName}
              roomId={req.roomId}
              chatId={
                currentUser.uid > req.sender
                  ? currentUser.uid + req.sender
                  : req.sender + currentUser.uid
              }
            />
          )
      )}
    </div>
  );
};

export default CallRequests;
