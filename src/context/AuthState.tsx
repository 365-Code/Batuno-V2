"use client";
import { UserType, chatUserType } from "@/utils";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  currentUser: UserType;
  addFavourite: any;
  removeFavourite: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const result = await getDoc(doc(db, "users", user.uid));
          setCurrentUser({ ...result.data(), logged: true } as UserType);
          // setCurrentUser({
          //     username: user.displayName || "",
          //     uid: user.uid || "",
          //     email: user.email || "",
          //     avatar: user.photoURL || "",
          //     logged: true
          // })
        } catch (error) {
          return error;
        }
      } else {
        setCurrentUser({
          username: "",
          uid: "",
          email: "",
          avatar: "",
          logged: false,
          favourites: [],
        });
      }
    });
  }, [auth]);

  const [currentUser, setCurrentUser] = useState<UserType>({
    username: "",
    uid: "",
    email: "",
    avatar: "",
    logged: false,
    favourites: [],
  });

  const addFavourite = (newUser: string) => {
    const favs = currentUser.favourites.findIndex((c) => c == newUser);
    if (favs == -1) {
      setCurrentUser((preVal) => ({
        ...preVal,
        favourites: [...preVal.favourites, newUser],
      }));
    }
  };

  const removeFavourite = (id: string) => {
    const favourites = currentUser.favourites.filter((c) => c != id);
    setCurrentUser((preVal) => ({ ...preVal, favourites }));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, addFavourite, removeFavourite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
