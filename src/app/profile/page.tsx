"use client";
import ErrorText from "@/components/ErrorText";
import NavSection from "@/components/NavSection";
import { useAuth } from "@/context/AuthState";
import { avatars } from "@/utils";
import { auth, db, storage } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";

const Page = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({
    username: "",
    avatar: "",
    phone: 0,
  });
  const [userError, setUserError] = useState({
    username: false,
    phone: false,
  });
  const [avatar, setAvatar] = useState<any>(currentUser.avatar || '');
  const [edit, setEdit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "phone" && value.toString().length > 10) {
      return;
    }
    setUserError((preVal) => ({ ...preVal, [name]: false }));
    setUser((preVal) => ({ ...preVal, [name]: value }));
  };

  const uploadFile = async (img: any) => {
    if (!img) return;
    const avatarRef = ref(storage, `avatars/${currentUser.uid+img?.name}`);
    const uploadTask = uploadBytesResumable(avatarRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setUser({ ...user, avatar: downloadURL });
        });
      }
    );
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      uploadFile(e.target.files[0])
    }
  };

  useEffect(() => {
    setUser((preVal) => ({ ...preVal, ...currentUser }));
  }, [currentUser]);

  const handleValidate = () => {
    if (user.username.length < 3) {
      setUserError({ username: true, phone: false });
    } else if (user.phone.toString().length != 10) {
      setUserError({ username: false, phone: true });
    } else {
      return true;
    }
    return false;
  };

  const editProfile = async () => {
    if (!handleValidate()) {
      return;
    }
    setEdit(false);
    try {
      if(auth.currentUser){
      await updateProfile(auth.currentUser, {
        displayName: user.username,
        photoURL: user.avatar,
      })
      await updateDoc(doc(db, "users", currentUser.uid), {
        username: user.username,
        avatar: user.avatar,
        phone: user.phone,
      });
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <main className="h-screen flex items-center justify-center md:p-4">
      <div className="max-w-full w-[900px] h-full flex shadow-sm shadow-black/50 dark:bg-[#0d121b] dark:border-white/10">
        <NavSection />
        <div className="w-full sm:p-4">
          <h1 className="text-3xl p-4">Profile</h1>
          <div className="flex-1 flex sm:flex-row items-center sm:items-start flex-col-reverse gap-4 w-full sm:min-w-[350px] mx-auto space-y-2">
            <div className="w-full flex-1 space-y-2 p-4">
              <div>
                <p>Username</p>
                <input
                  disabled={!edit}
                  minLength={3}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={user.username}
                  className="focus-visible:border-green-500 w-full border-b outline-none transition-all px-4 py-2"
                />
                <ErrorText
                  show={userError.username}
                  text="username should be atleast of 3 characters"
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  disabled
                  value={currentUser.email}
                  type="text"
                  className="focus-visible:border-green-500 w-full border-b outline-none transition-all px-4 py-2"
                />
              </div>
              <div>
                <p>Phone No</p>
                <input
                  disabled={!edit}
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="focus-visible:border-green-500 w-full border-b outline-none transition-all px-4 py-2"
                />
              </div>
              <ErrorText
                show={userError.phone}
                text="enter a valid phone number"
              />
            </div>

            <div className="relative w-fit space-y-2 text-center">
              <label htmlFor={edit ? "uploadAvatar" : ""}>
                <Image
                  height={200}
                  width={200}
                  src={avatar || avatars[4]}
                  alt="useravatar"
                  className=" mx-auto w-[200px] h-[200px]"
                />
              </label>
              {/* <input accept="image/*" id="uploadAvatar" onChange={handleAvatar} multiple={false} type="file" className="hidden" /> */}
              <input
                accept="image/*"
                id="uploadAvatar"
                // onChange={(e: ChangeEvent<HTMLInputElement>) => {
                //   e.target.files?.length && uploadFile(e.target.files[0]);
                // }}
                onChange={handleAvatar}
                multiple={false}
                type="file"
                className="hidden"
              />
              <i
                onClick={() => setUser({ ...user, avatar: currentUser.avatar })}
                className={`${
                  edit ? "visible" : "invisible"
                } fi fi-sr-cross-circle absolute hover:text-black text-white top-0 right-10 cursor-pointer`}
              />
              <p className="text-green-300">{currentUser.uid}</p>
              <div>
                {edit ? (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={editProfile}
                      className="basis-1/2 p-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white flex items-center gap-2 justify-center mx-auto"
                    >
                      <span>Save</span>
                      <i className="fi fi-sr-check" />
                    </button>
                    <button
                      onClick={() => {setEdit(false); setAvatar(currentUser.avatar)}}
                      className="basis-1/2 rounded-lg bg-slate-400 hover:bg-slate-500 text-white flex items-center gap-2 justify-center mx-auto"
                    >
                      <span>Cancel</span>
                      <i className="fi fi-sr-cross-small" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    className="w-full p-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white flex items-center gap-2 justify-center mx-auto"
                  >
                    <span>Edit</span>
                    <i className="fi fi-sr-pencil" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <DetailsSection /> */}
      </div>
    </main>
  );
};

export default Page;
