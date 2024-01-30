"use client";
import { useChatUser } from "@/context/ChatState";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ChatCard = ({
  cName,
  avatar,
  cUid,
  inactive
}: {
  cName?: string;
  avatar?: string;
  inactive?: boolean;
  cUid: string;
}) => {
  const { chatUser, setChatUser } = useChatUser();
  const nav = useRouter();
  const handleChatUser = () => {
    setChatUser({ username: cName, uid: cUid, avatar });
    nav.push(`/?chat=${cName}`);
  };

  return (
    <div
      onClick={handleChatUser}
      className={`flex px-4 py-2 items-center justify-start gap-4 cursor-pointer ${
        (!inactive && chatUser?.uid == cUid)
          ? "bg-green-400 text-white"
          : " hover:text-green-400"
      }`}
    >
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image
          height={100}
          width={100}
          src={
            avatar ||
            "https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
          }
          alt="avatar"
          className="res-img"
        />
      </div>
      <p>{cName || "Batuno"}</p>
    </div>
  );
};

export default ChatCard;
