"use client";
import { UserType } from "@/utils";
import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  currentUser: UserType;
  addFavourite: any;
  removeFavourite: any;
  setCurrentUser: any;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const nav = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const result = await getDoc(doc(db, "users", user.uid));
          setCurrentUser({ ...result.data(), logged: true } as UserType);
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
          onCall: false,
          call: {
            requestFrom: "",
            requestTo: "",
            roomId: "",
          },
        });
        nav.push("/auth/login");
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
    onCall: false,
    call: {
      requestTo: "",
      requestFrom: "",
      roomId: "",
    },
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
      value={{ currentUser, setCurrentUser, addFavourite, removeFavourite }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
