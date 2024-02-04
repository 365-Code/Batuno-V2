"use client";
import { useChatUser } from "@/context/ChatState";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavSection = () => {
  const pathname = usePathname();
  const { chatUser, chatDetails, clearChatUser, clearChatDetails } =
    useChatUser();
  const handleChat = () => {
    if ((chatDetails || chatUser.uid) && window.innerWidth <= 640) {
      clearChatDetails();
      clearChatUser();
    }
  };

  return (
    <section className="min-w-fit p-0 shadow-sm shadow-black/20 gap-8 flex flex-col items-center justify-between dark:bg-[#0d121b] dark:border-r dark:border-white/10">
      <div id="logo" className="py-4 px-2">
        <Image
          height={100}
          width={100}
          src="/logo.jpg"
          alt="logo"
          className="h-[48px] w-[48px] rounded-full"
        />
      </div>

      <div id="nav" className="flex-1 flex flex-col gap-2 w-full">
        <Link
          href={"/"}
          onClick={handleChat}
          className={`${pathname == "/" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-comments p-4" />
        </Link>

        {/* <Link href={"/"} className="nav-icon">
          <i className="fi fi-sr-book-bookmark p-4" />
        </Link> */}
        <Link href={"/groups"} 
          className={`${pathname == "/groups" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-users p-4" />
        </Link>

        <Link href={"/"} className="nav-icon">
          <i className="fi fi-sr-archive p-4" />
        </Link>
        <Link
          href={"/profile"}
          className={`${pathname == "/profile" && "icon-selected"} nav-icon`}
        >
          <i className="fi fi-sr-settings-sliders p-4" />
        </Link>
      </div>

      <button
        onClick={() => signOut(auth)}
        id="profile"
        className="py-4 nav-icon"
      >
        {/* <img src={currentUser.avatar || avatars[0]} alt="" className='h-[48px] w-[48px] rounded-full'/> */}
        <span className="text-sm">log</span>
        <i className="text-2xl fi fi-sr-power" />
        <span className="text-sm">out</span>
      </button>
    </section>
  );
};

export default NavSection;

// import Link from "next/link";
// import React from "react";

// const NavSection = () => {
//   return (
//     <section id="navSection" className="p-4 w-[100px] gap-4 flex flex-col justify-between items-center">

//       <div id="logo">
//         <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
//           <img
//             src="https://img.freepik.com/premium-photo/chat-bubbles-3d-rendering-concept-social-media-comments-messages-sms_393518-1170.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph"
//             alt=""
//             className=""
//           />
//         </div>
//       </div>

//       <div id="nav" className="flex gap-2 flex-col items-center">

//         <div className="h-[320px] text-center space-y-2 overflow-y-scroll no-scrollbar">
//           <Link href="/" className="nav-icon icon-selected">
//             {/* <i className="fi fi-sr-messages" /> */}
//             <i className="fi fi-sr-beacon" />

//             <span className="text-sm">All chats</span>
//           </Link>

//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-briefcase-blank" />
//             <span className="text-sm">Work</span>
//           </Link>

//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-folder"/>
//             <span className="text-sm">Freinds</span>
//           </Link>

//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-archive"/>
//             <span className="text-sm">Archive</span>
//           </Link>

//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-plus"/>
//             <span className="text-sm">Add</span>
//           </Link>
//         </div>

//         <hr className="w-full"/>
//         <div>
//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-user"/>
//             <span className="text-sm">Profile</span>
//           </Link>
//           <Link href="/" className="nav-icon">
//             <i className="fi fi-sr-settings-sliders"/>
//             <span className="text-sm">Settings</span>
//           </Link>
//         </div>
//       </div>

//       <div id="profile" className="text-white">
//           <button className="flex flex-col gap-2 items-center justify-center">
//             <i className="fi fi-sr-exit"/>
//             <span className="text-sm">log out</span>
//           </button>
//       </div>
//     </section>
//   );
// };

// export default NavSection;
