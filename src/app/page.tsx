"use client"
import ChatsSection from "@/components/ChatsSection";
import DetailsSection from "@/components/DetailsSection";
import MsgSection from "@/components/MsgSection";
import NavSection from "@/components/NavSection";
import WelcomeSection from "@/components/WelcomeSection";
import { useAuth } from "@/context/AuthState";
import { chatUser } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {

  
  const nav = useRouter()
  const {currentUser} = useAuth()

  useEffect(() => {
    !currentUser.logged && nav.push('/auth/login')
  }, [currentUser])


  return (
    <main className="h-screen flex items-center justify-center p-4">
      <div className="w-full h-full flex shadow-sm shadow-black/50">
        <NavSection />
        <ChatsSection />
        {
          chatUser
          ? <MsgSection />
          : <WelcomeSection/>
        }
        <DetailsSection />
      </div>
    </main>
  );
};

export default Home;
