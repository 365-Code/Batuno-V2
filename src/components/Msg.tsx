"use client";
import { avatars } from "@/utils";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Msg = ({
  msg,
  fromSelf,
  avatar,
  msgTime,
  mid,
}: {
  msg: string;
  fromSelf: boolean;
  mid?: string;
  avatar: string;
  msgTime?: any;
}) => {
  const scrollRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [msgAvatar, setMsgAvatar] = useState("");
  const fetchUserDetails = async () => {
    if (!mid) {
      return;
    }
    try {
      const userRef = doc(db, "users", mid);
      const result = await getDoc(userRef);
      if (result.exists()) {
        const usr = result.data();
        setMsgAvatar(usr.avatar);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const today = {
    time: new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    day: new Date().toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    year: new Date(msgTime.seconds * 1000).getFullYear(),
  };

  const msgDate = {
    time: new Date(msgTime.seconds * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    // day: new Date(msgTime.seconds*1000).toDateString(),
    day: new Date(msgTime.seconds * 1000).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    year: new Date(msgTime.seconds * 1000).getFullYear(),
  };

  return (
    <div
      className={`py-1 gap-1 flex flex-col ${
        fromSelf ? "items-end" : "items-start"
      }`}
    >
      <p
        className={`rounded-md p-4 w-fit sm:max-w-[400px] max-w-[93%] ${
          fromSelf
            ? "bg-green-400/30 dark:bg-green-400 backdrop-blur-sm"
            : "bg-white dark:bg-[#0d121b]"
        } `}
      >
        {msg}
      </p>
      <div
        className={`${
          fromSelf ? "flex-row text-right" : "flex-row-reverse text-left"
        } flex items-start gap-2 text-xs`}
      >
        <div ref={scrollRef} className="">
          {today.day != msgDate.day && (
            <p>
              {msgDate.day +
                " " +
                (today.year != msgDate.year ? msgDate.year : "")}
            </p>
          )}
          {today.time == msgDate.time ? "just now" : <p>{msgDate.time}</p>}
        </div>
        <Image
          height={100}
          width={100}
          className="w-[30px] h-[30px] rounded-full"
          src={msgAvatar || avatar || avatars[0]}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Msg;
