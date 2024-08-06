"use client";
import { useChatUser } from "@/context/ChatState";
import { avatars } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ChatCard = ({
  cName,
  avatar,
  cUid,
  inactive,
}: {
  cName?: string;
  avatar?: string;
  inactive?: boolean;
  cUid: string;
}) => {
  const { chatUser, setChatUser, clearGroup } = useChatUser();
  const nav = useRouter();
  const handleChatUser = () => {
    setChatUser({ username: cName, uid: cUid, avatar });
    clearGroup();
    nav.push(`/?chat=${cName}`);
  };

  return (
    <div
      onClick={handleChatUser}
      className={`flex px-4 py-2 items-center justify-start gap-4 cursor-pointer ${
        !inactive && chatUser?.uid == cUid
          ? "bg-green-400 text-white"
          : " hover:text-green-400"
      }`}
    >
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image
          height={100}
          width={100}
          src={avatar || avatars[0]}
          alt="profile-avatar"
          className="res-img"
        />
      </div>
      <p>{cName || "Batuno"}</p>
    </div>
  );
};

export default ChatCard;
