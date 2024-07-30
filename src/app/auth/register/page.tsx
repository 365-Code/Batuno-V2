"use client";
import { avatars } from "@/utils";
import { auth, db, storage } from "@/utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const nav = useRouter();

  const [avatar, setAvatar] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((preVal: any) => ({ ...preVal, [name]: value }));
  };

  const register = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      toast.success("Registered Successfully");

      await updateProfile(result.user, {
        displayName: user.username,
        photoURL: avatar,
      });
      console.log(result);

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        username: user.username,
        email: result.user.email,
        avatar: avatar,
        // favourites: [],
      });

      nav.push("/auth/login");
    } catch (error: any) {
      toast.error(error.code.toString().split("/")[1]);
      return error;
    }
  };

  const uploadFile = async (img: any) => {
    if (!img) return;
    const avatarRef = ref(storage, `avatars/${img?.name}`);
    const uploadTask = uploadBytesResumable(avatarRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {},
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatar(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    register();
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#f8f8f8] dark:bg-[#0d121b] w-[450px] max-w-full rounded-lg h-auto flex flex-col items-center gap-4 p-4 md:p-8"
      >
        <h1 className="text-3xl font-semibold tracking-normal">Batuno Chat</h1>
        <h2 className="text-2xl">Register</h2>
        <div className="flex  justify-between items-center w-full gap-2">
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="input-fill flex-1 border focus:border-green-500 p-4 rounded-lg"
          />
          <label
            htmlFor="avatar"
            className=" cursor-pointer w-[64px] h-[64px] overflow-hidden rounded-full"
          >
            <Image
              height={100}
              width={100}
              src={avatar || "/avatar.png"}
              alt="user-avatar"
              className="res-img"
            />
          </label>
          <input
            name="avatar"
            onChange={(e: any) => uploadFile(e.target.files[0])}
            type="file"
            id="avatar"
            className="hidden"
          />
        </div>
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="input-fill w-full border focus:border-green-500 p-4 rounded-lg"
        />
        <input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="input-fill w-full border focus:border-green-500 p-4 rounded-lg"
        />
        <button
          type="submit"
          className="p-4 text-white bg-green-400 hover:bg-green-500 w-full"
        >
          Register
        </button>
        <p>
          You do have an account{" "}
          <Link
            href="/auth/login"
            className=" w-full text-right outline-none focus-visible:underline text-sm text-green-400 hover:text-green-500 underline"
          >
            Login?
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Page;
