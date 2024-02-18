"use client";
import { useChatUser } from "@/context/ChatState";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavSection = () => {
  const pathname = usePathname();
  const { chatUser, chatDetails, clearChatUser, clearChatDetails } =
    useChatUser();
  const handleChat = () => {
    if ((chatDetails || chatUser.uid) && window.innerWidth <= 640) {
      clearChatDetails();
      clearChatUser();
    }
  };

  return (
    <section className="min-w-fit p-0 shadow-sm shadow-black/20 gap-8 flex flex-col items-center justify-between dark:bg-[#0d121b] dark:border-r dark:border-white/10">
      <div id="logo" className="py-4 px-2">
        <Image
          height={100}
          width={100}
          src="/logo.jpg"
          alt="logo"
          className="h-[48px] w-[48px] rounded-full"
        />
      </div>

      <div id="nav" className="flex-1 flex flex-col gap-2 w-full">
        <Link
          href={"/"}
          onClick={handleChat}
          className={`${pathname == "/" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-comments p-4" />
        </Link>
        <Link href={"/groups"} 
          className={`${pathname == "/groups" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-users p-4" />
        </Link>

        <Link href={"/"} className="nav-icon">
          <i className="fi fi-sr-archive p-4" />
        </Link>
        <Link
          href={"/profile"}
          className={`${pathname == "/profile" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-settings-sliders p-4" />
        </Link>
      </div>

      <button
        onClick={() => signOut(auth)}
        id="profile"
        className="py-4 nav-icon"
      >
        <span className="text-sm">log</span>
        <i className="text-2xl fi fi-sr-power" />
        <span className="text-sm">out</span>
      </button>
    </section>
  );
};

export default NavSection;