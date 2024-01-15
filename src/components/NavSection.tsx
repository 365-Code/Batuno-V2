import Link from "next/link";
import React from "react";

const NavSection = () => {
  return (
    <section id="navSection" className="p-4 w-[100px] gap-4 flex flex-col justify-between items-center">

      <div id="logo">
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/chat-bubbles-3d-rendering-concept-social-media-comments-messages-sms_393518-1170.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=sph"
            alt=""
            className=""
          />
        </div>
      </div>
      
      <div id="nav" className="flex gap-2 flex-col items-center">

        <div className="h-[320px] text-center space-y-2 overflow-y-scroll no-scrollbar">
          <Link href="/" className="nav-icon icon-selected">
            <i className="fi fi-sr-messages" />
            <span className="text-sm">All chats</span>
          </Link>

          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-briefcase-blank" />
            <span className="text-sm">Work</span>
          </Link>

          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-folder"/>
            <span className="text-sm">Freinds</span>
          </Link>

          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-archive"/>
            <span className="text-sm">Archive</span>
          </Link>
          
          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-plus"/>
            <span className="text-sm">Add</span>
          </Link>
        </div>

        <hr className="w-full"/>
        <div>
          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-user"/>
            <span className="text-sm">Profile</span>
          </Link>
          <Link href="/" className="nav-icon">
            <i className="fi fi-sr-settings-sliders"/>
            <span className="text-sm">Settings</span>
          </Link>
        </div>
      </div>

      <div id="profile" className="text-white">
          <button className="flex flex-col gap-2 items-center justify-center">
            <i className="fi fi-sr-exit"/>
            <span className="text-sm">log out</span>
          </button>
      </div>
    </section>
  );
};

export default NavSection;
