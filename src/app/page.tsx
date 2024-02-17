"use client";
import ChatsSection from "@/components/ChatsSection";
import DetailsSection from "@/components/DetailsSection";
import GroupDetailsSection from "@/components/GroupDetailSection";
import GroupMsgSection from "@/components/GroupMsgSection";
import MsgSection from "@/components/MsgSection";
import NavSection from "@/components/NavSection";
import WelcomeSection from "@/components/WelcomeSection";
import { useChatUser } from "@/context/ChatState";
import React from "react";

const Home = () => {
  const { chatUser, group, groupDetails, chatDetails } = useChatUser();

  return (
    <main className="h-screen flex items-center justify-center md:p-4">
      <div className="max-w-full w-full h-full flex md:justify-center">
        <NavSection />
        <ChatsSection />
        {chatUser.uid ? <MsgSection /> 
        : group.id ? <GroupMsgSection /> 
        : <WelcomeSection />}
        {
          chatDetails
          ?<DetailsSection />
          :<GroupDetailsSection/> 
        }
      </div>
    </main>
  );
};

export default Home;
