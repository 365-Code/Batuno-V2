"use client"
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthState";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { push } from "firebase/database";

type chatUserType = {
    uid: string,
    username: string,
    avatar: string
}

export type ChatUserContextType = {
    chatUser: chatUserType;
    setChatUser: any,
    clearChatUser: any
};

const ChatUserContext = createContext<ChatUserContextType | null>(null)

export const ChatUserState = ({children}: {children: React.ReactNode})=>{

    const initialChatUser = {
        username: '',
        uid: '',
        avatar: ''
    }
    const [chatUser, setChatUser] = useState<chatUserType>(initialChatUser)

    const clearChatUser = ()=>{
        setChatUser(initialChatUser)
    }

    return (
        <ChatUserContext.Provider value={{chatUser, setChatUser, clearChatUser}}>
            {children}
        </ChatUserContext.Provider>
    )
}


export const useChatUser = () => useContext(ChatUserContext) as ChatUserContextType