"use client"
import { createContext, useContext, useState } from "react";
import { chatUserType } from "@/utils";


export type ChatUserContextType = {
    chatUser: chatUserType;
    // chatDetails: detailType,
    chatDetails: string,
    setChatUser: any,
    clearChatUser: any,
    clearChatDetails: any,
    setChatDetails: any
};

const ChatUserContext = createContext<ChatUserContextType | null>(null)

export const ChatUserState = ({children}: {children: React.ReactNode})=>{

    const initialChatUser = {
        username: '',
        uid: '',
        avatar: ''
    }

    const initialChatDetail = {
        username: '',
        uid: '',
        avatar: '',
        email: ''
    }

    const [chatUser, setChatUser] = useState<chatUserType>(initialChatUser)
    // const [chatDetails, setChatDetails] = useState<detailType>(initialChatDetail)
    const [chatDetails, setChatDetails] = useState('')

    const clearChatDetails = () => {
        setChatDetails('')
    }

    const clearChatUser = ()=>{
        setChatUser(initialChatUser)
    }

    return (
        <ChatUserContext.Provider value={{chatUser, chatDetails, setChatUser, setChatDetails, clearChatUser, clearChatDetails}}>
            {children}
        </ChatUserContext.Provider>
    )
}


export const useChatUser = () => useContext(ChatUserContext) as ChatUserContextType