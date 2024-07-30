"use client";
import { createContext, useContext, useState } from "react";
import { chatUserType, groupType } from "@/utils";

export type ChatUserContextType = {
  chatUser: chatUserType;
  // chatDetails: detailType,
  chatDetails: string;
  setChatUser: any;
  clearChatUser: any;
  clearChatDetails: any;
  setChatDetails: any;
  setGroupDetails: any;
  group: groupType;
  groupDetails: string;
  clearGroupDetails: any;
  setGroup: any;
  clearGroup: any;
};

const ChatUserContext = createContext<ChatUserContextType | null>(null);

export const ChatUserState = ({ children }: { children: React.ReactNode }) => {
  const initialChatUser = {
    username: "",
    uid: "",
    avatar: "",
  };

  const initialGroup = {
    name: "",
    id: "",
    avatar: "",
  };

  const [chatUser, setChatUser] = useState<chatUserType>(initialChatUser);
  const [group, setGroup] = useState<groupType>(initialGroup);
  const [chatDetails, setChatDetails] = useState("");
  const [groupDetails, setGroupDetails] = useState("");

  const clearChatDetails = () => {
    setChatDetails("");
  };

  const clearGroupDetails = () => {
    setGroupDetails("");
  };

  const clearChatUser = () => {
    setChatUser(initialChatUser);
    clearChatDetails();
    clearGroupDetails();
  };

  const clearGroup = () => {
    setGroup(initialGroup);
    clearChatDetails();
    clearGroupDetails();
  };

  return (
    <ChatUserContext.Provider
      value={{
        chatUser,
        chatDetails,
        group,
        groupDetails,
        setGroup,
        setChatUser,
        setChatDetails,
        setGroupDetails,
        clearChatUser,
        clearChatDetails,
        clearGroup,
        clearGroupDetails,
      }}
    >
      {children}
    </ChatUserContext.Provider>
  );
};

export const useChatUser = () =>
  useContext(ChatUserContext) as ChatUserContextType;
