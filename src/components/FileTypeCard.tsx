import React from "react";
import FileSkeleton from "./FileSkeleton";
import Link from "next/link";

const FileTypeCard = ({ file }: { file?: any }) => {
  return (
    <div className=" p-2 bg-white/20 backdrop-blur-sm rounded-lg max-w-[300px] flex items-center gap-4 cursor-pointer">
      <div className="flex items-center gap-2">
        <FileSkeleton fileType={file.type} />
        <p className="">{file?.name || "Kierra McAdam"}</p>
      </div>
      <Link target="_blank" href={file?.url}>
        <i className="fi fi-sr-download text-lg hover:text-green-400" />
      </Link>
    </div>
  );
};

export default FileTypeCard;
