"use client"
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";



type UserType = {
    username: string,
    uid: string,
    email: string,
    avatar: string,
    logged: boolean
}

export type AuthContextType = {
    currentUser: UserType;
};

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthState = ({children}: {children: React.ReactNode})=>{
    
    useEffect(()=>{
        
        onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser({
                    username: user.displayName || "",
                    uid: user.uid || "",
                    email: user.email || "",
                    avatar: user.photoURL || "",
                    logged: true
                })
            } else{
                setCurrentUser({
                    username: '',
                    uid: '',
                    email: '',
                    avatar: '',
                    logged: false
                })
            }
        })

    }, [auth])

    const [currentUser, setCurrentUser] = useState<UserType>({
        username: '',
        uid: '',
        email: '',
        avatar: '',
        logged: false
    })
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext) as AuthContextType