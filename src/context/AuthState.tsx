"use client"
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";



type UserType = {
    username: string,
    uid: string,
    email: string,
    avatar: string,
    logged: boolean,
    phone?: number
}

export type AuthContextType = {
    currentUser: UserType;
};

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthState = ({children}: {children: React.ReactNode})=>{
    
    useEffect(()=>{
        
        onAuthStateChanged(auth, async (user) => {
            if(user){
                try{
                    const result = await getDoc(doc(db, 'users', user.uid))
                    setCurrentUser({...result.data(), logged: true} as UserType)
                    // setCurrentUser({
                    //     username: user.displayName || "",
                    //     uid: user.uid || "",
                    //     email: user.email || "",
                    //     avatar: user.photoURL || "",
                    //     logged: true
                    // })
                } catch (error){
                    return error
                }
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