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
            {/* <Image
              height={100}
              width={100}
              // src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740"
              src={file.url}
              alt=""
              className="res-img"
            /> */}
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
