"use client";
import ChatsSection from "@/components/ChatsSection";
import DetailsSection from "@/components/DetailsSection";
import GroupDetailsSection from "@/components/GroupDetailSection";
import GroupMsgSection from "@/components/GroupMsgSection";
import MsgSection from "@/components/MsgSection";
import NavSection from "@/components/NavSection";
import CallRequests from "@/components/Call/CallRequests";
import IncomingCall from "@/components/Call/IncomingCall";
import WelcomeSection from "@/components/WelcomeSection";
import { useChatUser } from "@/context/ChatState";
import React from "react";
import { useAuth } from "@/context/AuthState";
import dynamic from "next/dynamic";

const DynamicIncomingCall = dynamic(
  () => import("@/components/Call/IncomingCall"),
  { ssr: false }
);

const Home = () => {
  const { chatUser, group, chatDetails } = useChatUser();
  const { currentUser } = useAuth();

  return (
    <main className="h-screen flex items-center justify-center md:p-4">
      <div className="max-w-full w-full h-full flex md:justify-center relative">
        <NavSection />
        <ChatsSection />
        {chatUser.uid ? (
          <MsgSection />
        ) : group.id ? (
          <GroupMsgSection />
        ) : (
          <WelcomeSection />
        )}
        {chatDetails ? <DetailsSection /> : <GroupDetailsSection />}
        <CallRequests />
        <DynamicIncomingCall />
      </div>
    </main>
  );
};

export default Home;
