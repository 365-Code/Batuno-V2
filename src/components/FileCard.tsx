import { fileType } from "@/utils";
import Image from "next/image";
import React from "react";
import FileSkeleton from "./FileSkeleton";
import Link from "next/link";

const FileCard = ({ file }: { file: fileType }) => {
  return (
    
    <Link href={file.url} target="_blank">
    <div className="hover:bg-green-400 px-4 flex py-2 items-center justify-between gap-4 cursor-pointer">
      <div className="flex items-center gap-4">
        {file.type.includes("text") ? (
          <div className="w-[48px] h-[48px] text-2xl flex flex-col items-center justify-center">
            <FileSkeleton fileType={file.type} />
          </div>
        ) : (
          <div className="w-[48px] h-[48px] rounded-md overflow-hidden">
            <object data={file.url} type={file.type} className="w-full h-full"></object>
          </div>
        )}
        <p>{file.name}</p>
      </div>
      <i className="fi fi-sr-download text-lg hover:text-green-500" />
    </div>
      </Link>
  );
};

export default FileCard;