import React, { useState } from "react";

const ToggleButton = ({
  toggleChange,
  setToggleChange,
}: {
  toggleChange: boolean;
  setToggleChange: any;
}) => {
  const [toggle, setToggle] = useState(toggleChange);

  const handleToggle = () => {
    setToggle(!toggle);
    setToggleChange(!toggleChange);
  };

  return (
    <button
      onClick={handleToggle}
      className={`rounded-full w-[40px] group/toggle h-[25px] transition-all flex items-center ${
        toggleChange ? "bg-green-300 justify-end" : "justify-start bg-slate-300"
      } `}
    >
      <div className={`h-[15px] mx-1 w-[15px] bg-black rounded-full`} />
    </button>
  );
};

export default ToggleButton;
