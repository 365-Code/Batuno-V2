"use client"
import ChatsSection from "@/components/ChatsSection";
import DetailsSection from "@/components/DetailsSection";
import MsgSection from "@/components/MsgSection";
import NavSection from "@/components/NavSection";
import WelcomeSection from "@/components/WelcomeSection";
import { useAuth } from "@/context/AuthState";
import { useChatUser } from "@/context/ChatState";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {

  
  const nav = useRouter()
  const {currentUser} = useAuth()
  const {chatUser} = useChatUser()

  return (
    <main className="h-screen flex items-center justify-center md:p-4">
      <div className="max-w-full w-full h-full flex md:justify-center">
        <NavSection />
        <ChatsSection />
        {
          chatUser.uid
          ?
          <MsgSection />
          : <WelcomeSection/>
        }
        <DetailsSection />
      </div>
    </main>
  );
};

export default Home;
