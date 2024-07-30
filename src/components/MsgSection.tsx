"use client";
import React, {
  ChangeEvent,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from "react";
import Msg from "./Msg";
import { fileType, messageType, messagesType } from "@/utils";
import { useAuth } from "@/context/AuthState";
import { useChatUser } from "@/context/ChatState";
import Modal from "./Modal";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import FileSkeleton from "./FileSkeleton";
import DisplayFiles from "./DisplayFiles";
import { useRouter } from "next/navigation";
import OnCall from "./Call/OnCall";

const MsgSection = () => {
  const { currentUser } = useAuth();
  const { chatUser, clearChatUser, chatDetails, setChatDetails } =
    useChatUser();

  const nav = useRouter();

  const [msgs, setMsgs] = useState<messagesType>({
    id: "",
    name: chatUser.username,
    isGroup: false,
    messages: [] as Array<messageType>,
  });
  const [msg, setMsg] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [sendFiles, setSendFiles] = useState([] as Array<fileType>);
  const [showFiles, setShowFiles] = useState<Array<any>>();
  const [selectZoom, setSelectZoom] = useState({
    id: -1,
    file: {} as fileType,
  });

  const handleSelectedZoom = (id: number, file: fileType) => {
    setSelectZoom({ id, file });
  };

  const fetchMessages = async () => {
    const combineId =
      currentUser.uid > chatUser.uid
        ? currentUser.uid + chatUser.uid
        : chatUser.uid + currentUser.uid;
    try {
      const chatRef = doc(db, "chats", combineId);
      const querySnapshot = await getDoc(chatRef);

      if (querySnapshot.exists()) {
        const messages = querySnapshot.data().messages as Array<messageType>;
        setMsgs({
          id: combineId,
          name: chatUser.username,
          isGroup: false,
          messages,
        });
      } else {
        setMsgs({
          id: combineId,
          name: chatUser.username,
          isGroup: false,
          messages: [],
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const sendMsg = async () => {
    const combineId =
      currentUser.uid > chatUser.uid
        ? currentUser.uid + chatUser.uid
        : chatUser.uid + currentUser.uid;
    const chatRef = doc(db, "chats", combineId);
    const currentUserRef = doc(db, "users", currentUser.uid);
    const chatUserRef = doc(db, "users", chatUser.uid);
    try {
      const result = await getDoc(chatRef);
      if (!result.exists()) {
        await setDoc(chatRef, {
          messages: [
            {
              sender: currentUser.uid,
              files: sendFiles,
              text: msg,
              msgTime: Timestamp.now(),
            },
          ],
        });

        await updateDoc(currentUserRef, {
          contacts: arrayUnion(chatUser.uid),
        });

        await updateDoc(chatUserRef, {
          contacts: arrayUnion(currentUser.uid),
        });
      } else {
        await updateDoc(chatRef, {
          messages: arrayUnion({
            sender: currentUser.uid,
            // avatar: currentUser.avatar,
            files: sendFiles,
            text: msg,
            msgTime: Timestamp.now(),
          }),
        });
      }
    } catch (error) {
      return error;
    }
  };

  const uploadFile = (file: File) => {
    if (!file) return;
    const fileRef = ref(
      storage,
      `${currentUser.uid}/${crypto.randomUUID() + "-" + file.name}`
    );
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {},
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log(downloadURL);
          setSendFiles((preVal) => [
            ...preVal,
            { name: file.name, type: file.type, url: downloadURL },
          ]);
        });
      }
    );

    return true;
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      const showfiles = [];
      for (var i = 0; i < files.length; i++) {
        showfiles.push(files[i]);
      }
      setShowFiles(showfiles);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMsg(value);
  };

  const handleMsg = () => {
    showFiles?.forEach((file) => {
      uploadFile(file);
    });
    const newMsgs = [
      ...msgs.messages,
      {
        sender: currentUser.uid,
        files: sendFiles,
        text: msg,
        msgTime: Timestamp.now(),
      },
    ];
    setMsgs((preVal: any) => ({ ...preVal, messages: newMsgs }));
    sendMsg();
    handleReset();
  };

  const handleReset = () => {
    setMsg("");
    setShowEmoji(false);
    setShowFiles([]);
    setSendFiles([]);
  };

  const handleEmoji = (e: EmojiClickData) => {
    setMsg((preVal) => preVal + e.emoji);
  };

  const removeFile = (file: File) => {
    setShowFiles((preVal) => preVal?.filter((f) => f != file));
  };

  const hideEmoji = () => setShowEmoji(false);

  useEffect(() => {
    chatUser.uid && fetchMessages();
  }, [chatUser]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const unsub = async () => {
    try {
      onSnapshot(doc(db, "chats", msgs.id), (doc) => {
        if (doc.exists()) {
          const messages = doc.data().messages as Array<messageType>;
          setMsgs((preVal) => ({ ...preVal, messages }));
        }
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    unsub();
  }, [msgs.id]);

  return (
    <>
      <section
        className={`${
          chatDetails
            ? "w-0 overflow-hidden p-0 dark:border-0"
            : "flex-1 dark:border-r"
        } min-[1100px]:p-4 min-[1100px]:flex-1 relative flex flex-col justify-between max-w-[900px] backdrop-blur-sm bg-[#f4f6f3] dark:bg-[#080b11] sm:dark:border-r dark:border-white/10`}
      >
        <div
          id="heading"
          className="w-full h-[65px] z-[2] flex items-center gap-4 top-0 left-0 absolute bg-black/20 dark:bg-[#0d121b]  backdrop-blur-sm px-4 dark:border-b dark:border-white/10"
        >
          <Image
            onClick={() => setChatDetails(chatUser.uid)}
            height={100}
            width={100}
            className="w-[40px] h-[40px] rounded-full cursor-pointer"
            src={chatUser.avatar}
            alt=""
          />
          <h3
            onClick={() => setChatDetails(chatUser.uid)}
            className="cursor-pointer hover:text-green-400 text-2xl py-4"
          >
            {msgs.name || "Chat Name"}
          </h3>
          <i
            onClick={() => {
              nav.push("/");
              clearChatUser();
            }}
            className="sm:hidden fi fi-sr-cross-small ml-auto cursor-pointer"
          />
        </div>

        <div
          onClick={hideEmoji}
          id="chat-messages"
          className="h-[90%] flex-1 pt-16 overflow-y-scroll no-scrollbar"
        >
          {msgs.messages.map((msg: any, i) =>
            msg.sender == currentUser.uid ? (
              <div key={i}>
                <div className="flex flex-col items-end gap-2 mt-2">
                  {msg.files?.map((file: fileType, i: any) => (
                    <DisplayFiles
                      key={i}
                      fromSelf={true}
                      avatar={currentUser.avatar}
                      index={i}
                      setZoom={handleSelectedZoom}
                      file={file}
                      msgTime={msg.msgTime}
                    />
                  ))}
                </div>
                {msg.text != "" && (
                  <Msg
                    msgTime={msg.msgTime}
                    avatar={currentUser.avatar}
                    msg={msg.text}
                    fromSelf={true}
                  />
                )}
              </div>
            ) : (
              <div key={i}>
                <div className="flex flex-col items-start gap-2 mt-2">
                  {msg.files?.map((file: fileType, i: any) => (
                    <DisplayFiles
                      key={i}
                      fromSelf={false}
                      avatar={chatUser.avatar}
                      index={i}
                      setZoom={handleSelectedZoom}
                      file={file}
                      msgTime={msg.msgTime}
                    />
                  ))}
                </div>
                {msg.text != "" && (
                  <Msg
                    key={i}
                    msgTime={msg.msgTime}
                    avatar={chatUser.avatar}
                    msg={msg.text}
                    fromSelf={false}
                  />
                )}
              </div>
            )
          )}
        </div>

        <div
          id="send"
          className="mb-1 py-2 flex gap-2 md:gap-4 overflow-x-scroll no-scrollbar items-center max-w-full"
        >
          {showFiles?.map((file: File, i) => (
            <div
              key={i}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-start gap-1 relative"
            >
              <FileSkeleton fileType={file.type} />
              <span className="whitespace-nowrap">
                {file.name.slice(0, 12)}...
              </span>
              <i
                onClick={() => removeFile(file)}
                className="fi fi-sr-cross-circle absolute left-0 top-0 hover:text-slate-500 cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div
          id="send"
          className="h-[50px] flex gap-1 md:gap-4 items-center justify-between max-w-full"
        >
          <div className="max-h-full hidden md:block w-[40px] h-[40px] rounded-full overflow-hidden">
            <Image
              height={100}
              width={100}
              src={
                currentUser.avatar ||
                "https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
              }
              alt=""
              className="res-img"
            />
          </div>
          <div className="max-h-full flex items-center gap-2 w-full h-[50px]">
            <div className="max-h-full relative bg-white dark:bg-[#0d121b] focus-within:ring-green-500 focus-within:ring-1 rounded-md flex-1 flex items-center px-4 gap-4">
              <input
                name="msg"
                onFocus={hideEmoji}
                value={msg}
                onChange={handleChange}
                type="text"
                autoComplete="off"
                className="w-full py-3 sm:py-4 outline-none bg-transparent"
                placeholder="Write a reply"
              />
              <div className="flex gap-4 items-center">
                <label htmlFor="sendFiles">
                  <i className="fi fi-sr-clip hover:text-green-500 cursor-pointer text-xl" />
                </label>
                <input
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   setSendFiles(e.target.files ? e.target.files : "")
                  // }
                  // onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files && uploadFile(e.target.files[0])}
                  onChange={handleUploadFile}
                  value={""}
                  multiple
                  id="sendFiles"
                  type="file"
                  className="hidden"
                />
                <div className="absolute bottom-[115%] right-0">
                  <EmojiPicker
                    onEmojiClick={handleEmoji}
                    onReactionClick={handleEmoji}
                    open={showEmoji}
                    height={350}
                    reactionsDefaultOpen={true}
                    theme={Theme.AUTO}
                    className="no-scrollbar"
                  />
                </div>
                <i
                  onClick={() => setShowEmoji(!showEmoji)}
                  className={`fi fi-sr-smile-plus hover:text-green-500 ${
                    showEmoji && "text-green-500"
                  } cursor-pointer text-xl`}
                />
              </div>
            </div>
            <button
              onClick={handleMsg}
              className="max-h-full flex items-center  gap-2 rounded-md p-4 bg-green-400 hover:bg-green-500 text-white"
            >
              <span className="hidden sm:block">Send</span>
              <i className="fi fi-sr-paper-plane" />
            </button>
          </div>
        </div>

        {
          // all call requests
          currentUser.onCall && !currentUser.call && (
            <OnCall id={chatUser.uid} name={chatUser.username} />
          )
        }
      </section>
      <Modal
        showModal={selectZoom.id == -1 ? false : true}
        compo={
          <object
            onClick={() => handleSelectedZoom(-1, {} as fileType)}
            className={`cursor-zoom-out object-contain w-full h-full no-scrollbar`}
            type={selectZoom.file.type}
            width={"screen"}
            data={selectZoom.file.url}
          />
        }
      />
    </>
  );
};

export default MsgSection;
