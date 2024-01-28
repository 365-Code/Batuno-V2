"use client";
import React, { useEffect, useState } from "react";
import Msg from "./Msg";
import { messageType, messagesType } from "@/utils";
import { useAuth } from "@/context/AuthState";
import { useChatUser } from "@/context/ChatState";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Image from "next/image";

const MsgSection = () => {
  const { currentUser } = useAuth();
  const { chatUser, clearChatUser } = useChatUser();

  const [msgs, setMsgs] = useState<messagesType>({
    id: "",
    name: chatUser.username,
    isGroup: false,
    messages: [] as Array<messageType>,
  });

  const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   setMsgs({ name: chatUser.username, isGroup: false, messages: [] });
  // }, [chatUser]);

  // useEffect(() => {

  //   chats.forEach((cht) => {
  //     let ind = cht.users.findIndex((u) => u == currentUser.uId)
  //     ind = ind && cht.users.findIndex((u) => u == chatUser?.uId)
  //     if(cht.users.length <= 2 && ind){
  //       setMsgs({
  //         name: chatUser?.uId,
  //         messages: [...cht.chat.texts],
  //         isGroup: false
  //       })
  //     }
  //   })

  // }, [])

  const fetchMessages = async () => {
    const combineId =
      currentUser.uid > chatUser.uid
        ? currentUser.uid + chatUser.uid
        : chatUser.uid + currentUser.uid;
    try {
      const chatRef = doc(db, "chats", combineId);
      const querySnapshot = await getDoc(chatRef);

      if (querySnapshot.exists()) {
        const messages = querySnapshot.data().messages as Array<messageType>;
        setMsgs({
          id: combineId,
          name: chatUser.username,
          isGroup: false,
          messages,
        });
      } else {
        setMsgs({
          id: combineId,
          name: chatUser.username,
          isGroup: false,
          messages: [],
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const sendMsg = async () => {
    const combineId =
      currentUser.uid > chatUser.uid
        ? currentUser.uid + chatUser.uid
        : chatUser.uid + currentUser.uid;
    const chatRef = doc(db, "chats", combineId);
    const currentUserRef = doc(db, "users", currentUser.uid);
    const chatUserRef = doc(db, "users", chatUser.uid);
    try {
      const result = await getDoc(chatRef);
      if (!result.exists()) {
        await setDoc(chatRef, { messages: [] });

        await updateDoc(currentUserRef, {
          contacts: arrayUnion({
            uid: chatUser.uid,
            username: chatUser.username,
            avatar: chatUser.avatar,
          }),
        });

        await updateDoc(chatUserRef, {
          contacts: arrayUnion({
            uid: currentUser.uid,
            username: currentUser.username,
            avatar: currentUser.avatar,
          }),
        });
      } else {
        await updateDoc(chatRef, {
          messages: arrayUnion({
            sender: currentUser.uid,
            avatar: currentUser.avatar,
            text: msg,
            msgTime: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setMsg(value);
  };

  const handleMsg = () => {
    const newMsgs = [
      ...msgs.messages,
      {
        sender: currentUser.uid,
        avatar: currentUser.avatar,
        text: msg,
        msgTime: Timestamp.now(),
      },
    ];
    setMsgs((preVal: any) => ({ ...preVal, messages: newMsgs }));
    sendMsg();
    setMsg("");
  };

  useEffect(() => {
    chatUser.uid && fetchMessages();
  }, [chatUser]);

  const unsub = async () => {
    try {
      onSnapshot(doc(db, "chats", msgs.id), (doc) => {
        if (doc.exists()) {
          const messages = doc.data().messages as Array<messageType>;
          setMsgs((preVal) => ({ ...preVal, messages }));
        }
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    unsub();
  }, [msgs.id]);


  return (

    
    <section className="relative flex-1 flex flex-col justify-between backdrop-blur-sm bg-[#f4f6f3] dark:bg-[#080b11]">
      <Image
        height={800}
        width={800}
        className="h-full w-full object-cover absolute top-0 left-0 -z-[1] opacity-25 dark:opacity-10"
        src="/bg.svg"
        alt=""
      />
      <div
        id="heading"
        className="w-full h-[65px] z-[2] flex items-center gap-4 top-0 left-0 absolute bg-black/20 dark:bg-[#0d121b]  backdrop-blur-sm px-4"
      >

        <Image
        height={100}
        width={100}
          className="w-[40px] h-[40px] rounded-full"
          src={chatUser.avatar}
          alt=""
        />
        <h3 className="text-2xl py-4">{msgs.name || "Group Name"}</h3>

        {msgs.isGroup && (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center h-[36px] w-[72px] py-4 justify-center">
              <div className="absolute z-[2] top-0 left-0 w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
        height={100}
        width={100}
                  src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
                  alt=""
                  className="res-img"
                />
              </div>
              <div className="absolute z-[1] top-0 left-4 w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
        height={100}
        width={100}
                  src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
                  alt=""
                  className="res-img"
                />
              </div>
              <div className="absolute top-0 left-8 w-[36px] h-[36px] rounded-full overflow-hidden">
                <Image
        height={100}
        width={100}
                  src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
                  alt=""
                  className="res-img"
                />
              </div>
            </div>
            <p className="text-green-500 text-xl">+3</p>
          </div>
        )}

        <i onClick={() => (clearChatUser())} className="sm:hidden fi fi-sr-cross ml-auto cursor-pointer"/>
      </div>

      <div
        id="chat-messages"
        className="h-[90%] pt-16 overflow-y-scroll no-scrollbar"
      >
        {msgs.messages.map((msg: any, i) =>
          msg.sender == currentUser.uid ? (
            <Msg
              key={i}
              msgTime={msg.msgTime}
              avatar={currentUser.avatar}
              msg={msg.text}
              fromSelf={true}
            />
          ) : (
            <Msg
              key={i}
              msgTime={msg.msgTime}
              avatar={chatUser.avatar}
              msg={msg.text}
              fromSelf={false}
            />
          )
        )}
      </div>

      <div
        id="send"
        className="flex gap-1 md:gap-4 items-center justify-between max-w-full"
      >
        <div className="hidden md:block w-[40px] h-[40px] rounded-full overflow-hidden">
          <Image
        height={100}
        width={100}
            src={
              currentUser.avatar ||
              "https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
            }
            alt=""
            className="res-img"
          />
        </div>

        <div className="bg-white focus-within:ring-green-500 focus-within:ring-1 rounded-md flex-1 flex items-center px-4 gap-4">
          <input
            name="msg"
            value={msg}
            onChange={handleChange}
            type="text"
            className="w-full py-4 outline-none"
            placeholder="Write a reply"
          />
          <div className="flex gap-4 items-center">
            <i className="fi fi-sr-clip hover:text-green-500 cursor-pointer text-xl" />
            <i className="fi fi-sr-smile-plus hover:text-green-500 cursor-pointer text-xl" />
          </div>
        </div>

        <button
          onClick={handleMsg}
          className="flex items-center gap-2 rounded-md px-4 sm:px-6 py-4 bg-green-400 hover:bg-green-500 text-white"
        >
          <i className="fi fi-sr-paper-plane" />
          <span className="hidden sm:block">Send</span>
        </button>
      </div>
    </section>
  );
};

export default MsgSection;
