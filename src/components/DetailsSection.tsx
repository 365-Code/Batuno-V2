"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import FileCard from "./FileCard";
import ToggleButton from "./ToggleButton";
import Image from "next/image";
import { useChatUser } from "@/context/ChatState";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/AuthState";

const DetailsSection = () => {
  const { chatUser, chatDetails, clearChatDetails } = useChatUser();
  const { currentUser, addFavourite, removeFavourite } = useAuth();
  const [fav, setFav] = useState<boolean>(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const fetchDetails = async () => {
    try {
      const chatRef = doc(db, "users", chatDetails);
      const result = await getDoc(chatRef);
      if (result.exists()) {
        const chatDetails = result.data();
        setDetails({
          username: chatDetails.username,
          avatar: chatDetails.avatar,
          phone: chatDetails.phone,
          email: chatDetails.email,
        });
      }
      const ind = currentUser.favourites.findIndex((c) => (c.uid == chatDetails))
      if((ind) >= 0) {
        setFav(true)
      }

    } catch (error) {
      return error;
    }
  };

  const handleFavourite = async () => {
    console.log(fav);
    
    try {
      const userRef = doc(db, "users", currentUser.uid);
      if(fav){
        updateDoc(userRef, { favourites: arrayUnion(chatUser.uid) })
        addFavourite(chatUser)
      } else{
        updateDoc(userRef, { favourites: arrayRemove(chatUser.uid) });
        removeFavourite(chatUser.uid)
      }

    
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    chatDetails && fetchDetails();
  }, [chatDetails]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      chatDetails && handleFavourite();
    }, 2000);
    return () => clearTimeout(debounce);
  }, [fav]);

  return (
    <section className={`min-[1100px]:block space-y-4 dark:bg-[#0d121b] ${chatDetails ? 'flex-1 min-[1100px]:flex-none min-[1100px]:w-[320px]': 'w-0 overflow-hidden p-0'}`}>
      <div className="flex justify-end w-full py-2">
        <button onClick={clearChatDetails} className="hover:text-green-400">
          <i className="fi fi-sr-cross-small" />
        </button>
      </div>

      <div id="otherprofile" className="space-y-4 text-center">
        <div>
          <div className="w-[108px] h-[108px] mx-auto rounded-full overflow-hidden text-center">
            <Image
              height={100}
              width={100}
              src={
                details.avatar ||
                "https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=ais"
              }
              alt=""
              className="res-img"
            />
          </div>
          <h3 className="text-lg">{details.username || "Kierra McAdams"}</h3>
          <p className="text-sm font-semibold text-green-400">
            {details.email || "Co-founder @ Coffee Country"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <i className="fi fi-sr-phone-flip rotate-90 p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer" />
          <i className="fi fi-sr-beacon p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer" />
          <i className="fi fi-sr-video-camera-alt p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer" />
        </div>
      </div>
      <hr className="invisible" />

      <div
        id="otherfiles"
        className="max-h-[200px] overflow-y-scroll no-scrollbar"
      >
        <h3 className="text-slate-500">Shared files</h3>
        <FileCard />
        <hr />
      </div>
      <div id="options" className="space-y-2">
        <div className="py-4 flex items-center justify-between">
          <p className="text-slate-500 dark:text-white">Add to Favourites</p>
          <label onClick={() => setFav(!fav)}>
            <ToggleButton toggleChange={fav} setToggleChange={setFav}/>
          </label>
          {/* <input type="checkbox" checked={favourite} name="addToFavourite" className="" id="addToFavourite" /> */}
        </div>
        <hr />
        <button className="py-4 text-slate-500 dark:text-white hover:text-red-400">
          Delete this Contact
        </button>
        <hr />
        <button className="py-4 text-red-400">Block this Contact</button>
      </div>
    </section>
  );
};

export default DetailsSection;
