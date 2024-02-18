"use client";
import { useChatUser } from "@/context/ChatState";
import { chatUserType } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const GroupAddUserCard = ({
  cName,
  avatar,
  cUid,
  inactive,
  setNewMember,
  newMembers
}: {
  cName?: string;
  avatar?: string;
  inactive?: boolean;
  cUid: string;
  setNewMember: any;
  newMembers: Array<string>
}) => {

  const [selected, setSelected] = useState(false);

  const handleSelect = (select: boolean) => {
    setSelected(select)
    
    if(select){
      setNewMember((preVal: Array<string>) => ([...preVal, cUid] ) )
    } else{
      setNewMember((preVal: Array<string>) => (preVal.filter((c) => c != cUid ) ) )
    }
  }

  useEffect(() => {
    newMembers.length == 0 && setSelected(false)
  }, [newMembers])

  return (
    <div
    onClick={() =>handleSelect(!selected)}
      className={`flex min-w-fit px-4 py-2 whitespace-nowrap items-center justify-start gap-4 cursor-pointer ${
        (selected)
          ? "bg-green-400 text-white"
          : " hover:text-green-400 backdrop-blur-sm bg-white/10"
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
          alt="user-add-avatar"
          className="res-img"
        />
      </div>
      <p>{cName || "batuno"}</p>
    </div>
  );
};

export default GroupAddUserCard;
