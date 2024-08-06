import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import GroupAddUserCard from "./GroupAddUserCard";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "@/utils/firebase";
import { useAuth } from "@/context/AuthState";
import { chatUserType } from "@/utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ErrorText from "./ErrorText";

const GroupCreate = ({
  newGroup,
  setNewGroup,
}: {
  newGroup: boolean;
  setNewGroup: any;
}) => {
  const { currentUser } = useAuth();

  const [contacts, setContacts] = useState([] as Array<chatUserType>);
  const [searchChats, setSearchChats] = useState([] as Array<chatUserType>);
  const [searchInput, setSearchInput] = useState("");
  const [newMembers, setNewMembers] = useState([] as Array<string>);
  const [avatarFile, setAvatarFile] = useState<any>();
  const [groupData, setGroupData] = useState({
    name: "",
    avatar:
      "https://img.freepik.com/free-vector/students-thinking-concept-illustration_114360-18754.jpg?w=740&t=st=1707023400~exp=1707024000~hmac=957ede2326f8b079f2fa96e8fe28ec43723ed57ef099f278c65ca160581c3f87",
  });

  const [error, setError] = useState({
    name: false,
    contacts: false,
  });

  const getMyChats = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const result = await getDoc(userRef);

      if (result.exists()) {
        const { contacts } = result.data();
        let conts = [] as Array<chatUserType>;

        contacts.forEach(async (element: string) => {
          const queryRef = doc(db, "users", element);
          const query = await getDoc(queryRef);
          if (query.exists()) {
            conts.push(query.data() as chatUserType);
          }
          setContacts(conts);
        });
      }
    } catch (error) {
      return error;
    }
  };

  const searchChat = async () => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("email", "==", searchInput),
      where("email", "!=", currentUser.email)
    );
    const results = await getDocs(q);
    let searchUsers = [] as Array<any>;
    results?.forEach((doc) => {
      searchUsers.push(doc.data());
    });
    if (results.empty) {
      searchUsers = contacts.filter((u) =>
        u.username.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    setSearchChats(searchUsers);
  };

  const handleGroupAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatarFile(URL.createObjectURL(e.target.files[0]));
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (img: File) => {
    if (!img) return;
    const avatarRef = ref(
      storage,
      `GroupAvatars/${crypto.randomUUID() + "-" + img?.name}`
    );
    const uploadTask = uploadBytesResumable(avatarRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {},
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          setGroupData((preVal) => ({ ...preVal, avatar: downloadURL }));
        });
      }
    );
  };

  const handleValidate = () => {
    if (!groupData.name) {
      setError({ contacts: false, name: true });
    } else if (newMembers.length == 0) {
      setError({ name: false, contacts: true });
    } else {
      setError({ name: false, contacts: false });
      return true;
    }
    return false;
  };

  const handleCreateGroup = async () => {
    const members = [currentUser.uid, ...newMembers];
    const group = { ...groupData, members, messages: [] };
    if (!handleValidate()) {
      return;
    }

    try {
      const groupRef = collection(db, "groups");
      const res = await addDoc(groupRef, group);
      members.forEach(async (mem: string) => {
        const userRef = doc(db, "users", mem);
        await updateDoc(userRef, {
          groups: arrayUnion(res.id),
        });
      });
      handleCancel();
    } catch (error) {
      return error;
    }
  };

  const handleCancel = () => {
    setNewMembers([]);
    setNewGroup(false);
    setError({ name: false, contacts: false });
    setGroupData({ name: "", avatar: "" });
  };

  useEffect(() => {
    currentUser.logged && getMyChats();
  }, [currentUser]);

  return (
    <section
      className={`${
        newGroup ? "block" : "hidden"
      } sm:min-w-[350px] sm:block md:max-w-[500px] bg-green-50 shadow-sm shadow-black/30 flex-1 dark:bg-[#0d121b] dark:border-r dark:border-white/10`}
    >
      <div className="flex items-center gap-2">
        <label htmlFor="groupAvatar">
          <Image
            width={50}
            height={50}
            src={
              avatarFile ||
              "avatar.png"
            }
            alt="group-avatar"
            className="w-[48px] h-[48px] rounded-full res-img"
          />
        </label>
        <input
          onChange={handleGroupAvatar}
          type="file"
          className="hidden"
          id="groupAvatar"
        />
        <input
          type="text"
          value={groupData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGroupData((preVal) => ({ ...preVal, name: e.target.value }))
          }
          placeholder="New Group Name"
          className="border px-4 py-3 flex-1 rounded-lg outline-none transition-all focus-within:border-green-500"
        />
      </div>
      <div className="divt-2">
        <ErrorText
          text={`Missing group ${error.contacts ? "contacts" : "name"}`}
          show={error.contacts || error.name}
        />
      </div>
      <div className="py-2 space-y-2 flex flex-col max-h-[94%]">
        <div className="flex justify-between items-center">
          <p>
            Add Contacts{" "}
            <span className="text-slate-400">
              You{newMembers.length > 0 && "+" + newMembers.length}
            </span>{" "}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateGroup}
              className="text-green-400 border border-green-500 hover:text-white px-2 py-1 rounded-lg hover:bg-green-500 flex items-center"
            >
              Create Group
            </button>
            <button
              onClick={handleCancel}
              className={`text-slate-400 hover:text-slate-500 ${
                newMembers.length > 0 ? "sm:inline-block" : "sm:hidden"
              } `}
            >
              cancel
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap md:justify-between gap-2 overflow-y-scroll custom-scrollbar">
          {contacts.map((c, i) => (
            <div key={c.uid} className="md:w-[49%] flex-1 ">
              <GroupAddUserCard
                newMembers={newMembers}
                setNewMember={setNewMembers}
                cUid={c.uid}
                cName={c.username}
                avatar={c.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupCreate;
