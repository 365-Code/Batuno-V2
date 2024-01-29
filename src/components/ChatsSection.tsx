"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { avatars, chats, users } from "@/utils";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/AuthState";
import { useChatUser } from "@/context/ChatState";

const ChatsSection = () => {
  const [chatUsers, setChatUsers] = useState([] as Array<any>);
  const [allChats, setAllChats] = useState([] as Array<any>);
  const [currentChat, setCurrentChat] = useState([] as Array<any>);
  const [allGroups, setAllGroups] = useState([] as Array<any>);
  const [searchInput, setSearchInput] = useState("");
  const [searchChats, setSearchChats] = useState([] as Array<any>);

  // useEffect(() => {
  //   let uChats = [] as Array<any>;
  //   let cUsers = [] as Array<any>;
  //   let uGroups = [] as Array<any>;

  //   chats.forEach((chat) => {
  //     const u = chat.users.findIndex((u) => u == currentUser.uid);

  //     if (chat.users.length <= 2 && u != -1) {
  //       cUsers.push(chat.users.find((u) => u != currentUser.uid));
  //     }
  //   });

  //   setChatUsers(cUsers);
  // }, []);

  const { currentUser } = useAuth();
  const { chatUser } = useChatUser();

  // const usersRef = collection(db, 'users')

  const getMyChats = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const result = await getDoc(userRef);

      if (result.exists()) {
        const { contacts } = result.data();
        setAllChats(contacts);
      }
    } catch (error) {
      return error;
    }
  };

  const searchChat = async () => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("email", "==", searchInput),
      where("email", "!=", currentUser.email)
    );
    const results = await getDocs(q);
    let searchUsers = [] as Array<any>;
    results.forEach((doc) => {
      searchUsers.push(doc.data());
    });
    setSearchChats(searchUsers);
  };

  useEffect(() => {
    currentUser.uid && getMyChats();
  }, [currentUser]);

  useEffect(() => {
    searchInput ? searchChat() : setSearchChats([]);
  }, [searchInput]);
  return (
    <section
      className={`${
        chatUser.uid ? "w-0" : "w-full"
      } overflow-hidden sm:w-[250px] md:w-[300px] px-0 gap-2 flex flex-col dark:bg-[#0d121b] dark:border-r dark:border-white/10`}
    >
      <div
        id="search"
        className="border focus-within:border-green-500  px-4 mx-4 rounded-lg flex items-center py-1"
      >
        <i className="fi fi-rr-search" />
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          type="search"
          placeholder="Search User"
          className="font-light w-full text-slate-500 dark:text-white border-none outline-none bg-transparent py-1 pl-2"
        />
      </div>

      {searchChats.length > 0 && (
        <div id="searchChats" className="h-auto">
          <h3 className="text-slate-500 py-1 px-4">Search</h3>
          <div className="max-h-[140px] overflow-y-scroll custom-scrollbar">
            {searchChats?.map((u, i) => (
              <ChatCard
                key={u.uid}
                cUid={u.uid}
                cName={u.username}
                avatar={u.avatar}
              />
            ))}
          </div>
        </div>
      )}

      {/* <div id="favourites" className="h-auto">
        <h3 className="text-slate-500 py-1 px-4">Favourites</h3>
        <div className="h-[140px] overflow-y-scroll custom-scrollbar">
          {users.map(
            (u, i) =>
              i > 3 && (
                <ChatCard
                  key={u.uId}
                  cUid={u.uId}
                  cName={u.name}
                  avatar={avatars[i]}
                />
              )
          )}
        </div>
      </div> */}

      <div id="all-chats" className="h-auto">
        <h3 className="text-slate-500 dark:text-white py-1 px-4">All Chats</h3>
        {!allChats.length && <p className="py-2 px-4">No Contacts Yet</p> }
        <div className="h-[240px] overflow-y-scroll custom-scrollbar">
          {allChats?.map((u, i) => (
            <ChatCard
              key={u.uid}
              cName={u.username}
              cUid={u.uid}
              avatar={u.avatar}
            />
          ))}
        </div>
      </div>

      {allGroups.length > 0 && (
        <div id="group" className="h-full">
          <h3 className="text-slate-500 py-1 px-4 flex gap-2">
            <span>Groups</span>
            <button className="hover:text-slate-900">
              <i className="fi fi-sr-plus-hexagon text-xl" />
            </button>
          </h3>
          <div className="max-h-[140px] overflow-y-scroll custom-scrollbar">
            {allGroups.map((g, i) => (
              <ChatCard key={i} cName={g} active={false} cUid={g.id} />
            ))}
            {/* <ChatCard cName='Coffee Nerds' active={true}/>
            <ChatCard cName='App Chemistry' active={false}/> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatsSection;
