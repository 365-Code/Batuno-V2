"use client";
import { useChatUser } from "@/context/ChatState";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const GroupCard = ({
  gName,
  avatar,
  gid,
  inactive,
}: {
  gName?: string;
  avatar?: string;
  inactive?: boolean;
  gid: string;
}) => {
  const { group, setGroup, clearChatUser } = useChatUser();
  const nav = useRouter();
  const handleChatUser = () => {
    setGroup({ name: gName, id: gid, avatar });
    clearChatUser();
    nav.push(`/?group=${gName}`);
  };

  return (
    <div
      onClick={handleChatUser}
      className={`flex px-4 py-2 items-center justify-start gap-4 cursor-pointer ${
        !inactive && group?.id == gid
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
          alt="group-avatar"
          className="res-img"
        />
      </div>
      <p>{gName || "Batuno"}</p>
    </div>
  );
};

export default GroupCard;
