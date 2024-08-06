import React from "react";

const CardSkeleton = () => {
  return (
    <div className="px-4 py-2 flex-1 flex items-center gap-2 bg-[#151b28]">
      <div className="h-[40px] w-[40px] rounded-full bg-[#0d121b]"></div>
      <div className="flex-1 w-full h-[20px] bg-[#0d121b]"></div>
    </div>
  );
};

export default CardSkeleton;
