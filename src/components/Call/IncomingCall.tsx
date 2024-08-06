"use client";
import { useAuth } from "@/context/AuthState";
import React from "react";
import P2PCall from "../agora/P2PCall";

const IncomingCall = () => {
  const { currentUser } = useAuth();
  if (!currentUser.onCall || !currentUser.call) return;
  if (typeof window === undefined) return;

  return (
    <div className="absolute slide-left bottom-4 right-4">
      <P2PCall
        appId={process.env.NEXT_PUBLIC_AGORA_APP_ID! || ""}
        channelName={currentUser.call.roomId || "agora-room"}
      />
    </div>
  );
};

export default IncomingCall;
