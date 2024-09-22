"use client";
import React, { useEffect, useState } from "react";
import FileCard from "./FileCard";
import Image from "next/image";
import { useChatUser } from "@/context/ChatState";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuth } from "@/context/AuthState";
import { fileType } from "@/utils";

const GroupDetailsSection = () => {
  const { setChatDetails, groupDetails, clearGroupDetails } = useChatUser();
  const { currentUser } = useAuth();
  const [groupMembers, setGroupMembers] = useState([] as Array<any>);
  const [details, setDetails] = useState({
    username: "",
    avatar: "",
  });
  const [selectedDetail, setSelectedDetail] = useState("chat");

  const [sharedFiles, setSharedFiles] = useState<Array<fileType>>([]);

  const fetchDetails = async () => {
    try {
      const chatRef = doc(db, "groups", groupDetails);
      const result = await getDoc(chatRef);
      if (result.exists()) {
        const chatDetails = result.data();

        setDetails({
          username: chatDetails.name,
          avatar: chatDetails.avatar,
        });

        const { members } = result.data();
        let mems = [] as Array<{
          uid: string;
          username: string;
          avatar: string;
        }>;
        members
          ?.filter((m: string) => m != currentUser.uid)
          ?.forEach(async (mem: string) => {
            const userRef = doc(db, "users", mem);
            const result = await getDoc(userRef);
            if (result.exists()) {
              const { uid, username, avatar } = result.data();
              mems = [...mems, { uid, username, avatar }];
              setGroupMembers(mems);
            }
          });

        const { messages } = result.data();
        let files = [] as Array<fileType>;
        messages?.forEach((m: any) => {
          if (m.files) {
            files = [...files, ...m.files];
          }
        });
        setSharedFiles(files);
      }
    } catch (error) {
      return error;
    }
  };

  const handleDeleteContact = async () => {};

  useEffect(() => {
    groupDetails && fetchDetails();
  }, [groupDetails]);

  return (
    <section
      className={`p-0 min-[1100px]:block space-y-3 dark:bg-[#0d121b] ${
        groupDetails
          ? "flex-1 min-[1100px]:flex-none min-[1100px]:w-[320px]"
          : "w-0 overflow-hidden p-0"
      }`}
    >
      <div className="flex justify-end w-full px-4 py-2">
        <button onClick={clearGroupDetails} className="hover:text-green-400">
          <i className="fi fi-sr-cross-small" />
        </button>
      </div>

      <div id="otherprofile" className="px-4 space-y-4 text-center">
        <div>
          <div className="w-[100px] h-[100px] mb-2 mx-auto rounded-full overflow-hidden text-center">
            <Image
              height={100}
              width={100}
              src={
                details.avatar ||
                "https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=ais"
              }
              alt="group-avatar"
              className="res-img"
            />
          </div>
          <h3 className="text-lg">{details.username || "Kierra McAdams"}</h3>
          <p className="text-sm font-semibold text-green-400">
            {"Group Description"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <i
            onClick={() => setSelectedDetail("call")}
            className={`fi fi-sr-phone-flip rotate-90 p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer ${
              selectedDetail == "call" && "bg-green-500 border-green-500"
            }`}
          />
          <i
            onClick={() => setSelectedDetail("chat")}
            className={`fi fi-sr-beacon p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer ${
              selectedDetail == "chat" && "bg-green-500 border-green-500"
            }`}
          />
          <i
            onClick={() => setSelectedDetail("videoCall")}
            className={`fi fi-sr-video-camera-alt p-4 border rounded-full hover:text-white hover:bg-green-400 hover:border-green-500 cursor-pointer ${
              selectedDetail == "videoCall" && "bg-green-500 border-green-500"
            }`}
          />
        </div>
      </div>
      <hr className="invisible" />

      <div id="members">
        <h3 className="text-slate-500 dark:text-white px-4">Group Members</h3>
        <div className="max-h-[150px] py-1 w-full overflow-y-scroll no-scrollbar">
          {groupMembers.length > 0 ? (
            groupMembers.map((mem) => (
              <button
                key={mem.uid}
                onClick={() => setChatDetails(mem.uid)}
                className={
                  "flex px-4 py-2 items-center justify-start gap-4 cursor-pointer hover:text-green-400"
                }
              >
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                  <Image
                    height={100}
                    width={100}
                    src={
                      mem.avatar ||
                      "https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
                    }
                    alt="profile-avatar"
                    className="res-img"
                  />
                </div>
                <p>{mem.username || "Batuno"}</p>
              </button>
            ))
          ) : (
            <p className="px-4 text-sm">No files shared yet</p>
          )}
        </div>
      </div>
      <hr className="w-[95%] mx-auto" />

      <div id="otherfiles">
        <h3 className="text-slate-500 dark:text-white px-4">Shared files</h3>
        <div className="max-h-[150px] py-1 w-full overflow-y-scroll no-scrollbar">
          {sharedFiles.length > 0 ? (
            sharedFiles.map((f, i) => <FileCard key={i} file={f} />)
          ) : (
            <p className="px-4 text-sm">No files shared yet</p>
          )}
        </div>
      </div>

      <hr className="w-[95%]" />
      <div id="options" className="space-y-2">
        <button
          onClick={handleDeleteContact}
          className="px-4 py-2 text-slate-500 dark:text-white hover:text-red-400"
        >
          Delete this Contact
        </button>
        <hr className="w-[95%] mx-auto" />
        <button className="px-4 py-4 text-red-400">Block this Contact</button>
      </div>
    </section>
  );
};

export default GroupDetailsSection;
