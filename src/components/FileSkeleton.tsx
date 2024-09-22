import React from "react";
import "file-icon-vectors/dist/file-icon-vectors.min.css";

const FileSkeleton = ({ fileType }: { fileType?: string }) => {
  const type = fileType?.split("/")[1];
  const fileIcon = "fiv-icon-" + type;
  return (
    <div>
      <div className="h-[40px] w-[40px] rounded-lg flex flex-col items-center justify-center">
        <span className={`fiv-cla ${fileIcon} text-5xl`} />
      </div>
    </div>
  );
};

export default FileSkeleton;
