"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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

const GroupChatSection = ({
  newGroup,
  setNewGroup,
}: {
  newGroup: boolean;
  setNewGroup: any;
}) => {
  const [allChats, setAllChats] = useState([] as Array<chatUserType>);
  const [allGroups, setAllGroups] = useState([] as Array<any>);
  const [searchInput, setSearchInput] = useState("");
  const [searchChats, setSearchChats] = useState([] as Array<any>);

  const { currentUser } = useAuth();
  const { chatUser } = useChatUser();

  const getMyGroups = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const result = await getDoc(userRef);

      if (result.exists()) {
        const { groups } = result.data();

        let grps = [] as Array<groupType>;

        groups.forEach(async (element: string) => {
          try {
            const queryRef = doc(db, "groups", element);
            const query = await getDoc(queryRef);
            if (query.exists()) {
              grps.push({ id: element, ...query.data() } as groupType);
            }
            setAllGroups(grps);
          } catch (error) {
            return error;
          }
        });
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
    currentUser.logged && getMyGroups();
  }, [currentUser, newGroup]);

  return (
    <section
      className={`${
        chatUser.uid || newGroup ? "w-0 dark:border-0" : "w-full dark:border-r"
      } overflow-hidden sm:w-[250px] sm:flex-1 md:flex-none md:w-[300px] px-0 gap-2 flex flex-col dark:bg-[#0d121b] sm:dark:border-r dark:border-white/10`}
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
          placeholder="Search Group"
          className="font-light w-full text-slate-500 dark:text-white border-none outline-none bg-transparent py-1 pl-2"
        />
      </div>

      {searchChats.length > 0 && (
        <div id="searchChats" className="h-auto">
          <h3 className="text-slate-500 py-1 px-4">Search</h3>
          <div className="max-h-[140px] overflow-y-scroll custom-scrollbar">
            {searchChats?.map((u, i) => (
              <GroupCard
                key={u.uid}
                gid={u.uid}
                gName={u.username}
                avatar={u.avatar}
                inactive={true}
              />
            ))}
          </div>
        </div>
      )}

      <div id="group-section-chat" className="h-auto">
        <div
          onClick={() => setNewGroup(true)}
          className="text-slate-400 hover:text-slate-500 md:hidden dark:hover:text-slate-100 py-1 px-4 flex gap-2"
        >
          <span>Create Group</span>
          <button className="hover:text-slate-900 dark:hover:text-slate-100">
            <i className="fi fi-sr-plus-hexagon text-xl" />
          </button>
        </div>
        <h3 className="text-slate-500 dark:text-white py-1 px-4">All Groups</h3>
        {!allGroups.length && <p className="py-2 px-4">No Groups Yet</p>}
        <div className="h-[240px] overflow-y-scroll custom-scrollbar">
          {allGroups?.map((g) => (
            <GroupCard key={g.id} gName={g.name} gid={g.id} avatar={g.avatar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupChatSection;
