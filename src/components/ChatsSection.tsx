"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { chatUserType, groupType } from "@/utils";
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
import GroupCard from "./GroupCard";
import CardSkeleton from "./CardSkeleton";

const ChatsSection = () => {
  const [allChats, setAllChats] = useState([] as Array<chatUserType>);
  const [favChats, setFavChats] = useState([] as Array<chatUserType>);
  const [allGroups, setAllGroups] = useState([] as Array<any>);
  const [searchInput, setSearchInput] = useState("");
  const [searchChats, setSearchChats] = useState([] as Array<any>);
  const [loadingChats, setLoadingChats] = useState(true);

  const { currentUser } = useAuth();
  const { chatUser, group } = useChatUser();

  const getMyChats = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const result = await getDoc(userRef);

      if (result.exists()) {
        const { contacts, favourites, groups } = result.data();
        let conts = [] as Array<chatUserType>;
        contacts?.forEach(async (element: string) => {
          try {
            const queryRef = doc(db, "users", element);
            const query = await getDoc(queryRef);
            if (query.exists()) {
              conts.push(query.data() as chatUserType);
            }
            setAllChats(conts);
          } catch (error) {
            console.log(error);
          }
        });

        let favs = [] as Array<chatUserType>;
        favourites?.forEach(async (element: string) => {
          try {
            const queryRef = doc(db, "users", element);
            const query = await getDoc(queryRef);
            if (query.exists()) {
              favs.push(query.data() as chatUserType);
              setFavChats(favs);
            }
          } catch (error) {}
        });

        let grps = [] as Array<groupType>;
        groups?.forEach(async (element: string) => {
          const queryRef = doc(db, "groups", element);
          const query = await getDoc(queryRef);
          if (query.exists()) {
            grps.push({ id: element, ...query.data() } as groupType);
          }
          setAllGroups(grps);
        });
      }

      setLoadingChats(false);
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
    results?.forEach((doc) => {
      searchUsers.push(doc.data());
    });
    if (results.empty) {
      searchUsers = allChats.filter((u) =>
        u.username.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
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
        chatUser.uid || group.id ? "w-0 dark:border-0" : "w-full dark:border-r"
      } overflow-hidden sm:w-[250px] md:w-[300px] px-0 gap-2 flex flex-col dark:bg-[#0d121b] sm:dark:border-r dark:border-white/10`}
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
                inactive={true}
              />
            ))}
          </div>
        </div>
      )}

      {favChats.length > 0 && (
        <div id="favourites" className="h-auto">
          <h3 className="text-slate-500 dark:text-white py-1 px-4">
            Favourites
          </h3>
          <div className="max-h-[140px] overflow-y-scroll custom-scrollbar">
            {favChats.map((u) => (
              <ChatCard
                key={u.uid}
                cUid={u.uid}
                cName={u.username}
                avatar={u.avatar}
                inactive={true}
              />
            ))}
          </div>
        </div>
      )}

      <div id="all-chats" className="max-h-full h-fit">
        <h3 className="text-slate-500 dark:text-white py-1 px-4">All Chats</h3>
        {loadingChats
          ? [...Array(5)].map((x, i) => (
              <div
                key={i}
                className={`animate-pulse px-4 my-2`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1s",
                }}
              >
                <CardSkeleton />
              </div>
            ))
          : !allChats.length && <p className="py-2 px-4">No Contacts Yet</p>}

        <div className="max-h-[240px] overflow-y-scroll custom-scrollbar">
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
        <div id="group" className="">
          <h3 className="text-slate-500 dark:text-white py-1 px-4 flex gap-2">
            <span>Groups</span>
          </h3>
          <div className="max-h-[140px] overflow-y-scroll custom-scrollbar">
            {allGroups.map((g, i) => (
              <GroupCard
                key={g.id}
                gName={g.name}
                avatar={g.avatar}
                gid={g.id}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatsSection;
