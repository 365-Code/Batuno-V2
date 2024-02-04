import Image from 'next/image'
import React from 'react'
import FileSkeleton from './FileSkeleton'
import Link from 'next/link'

const FileTypeCard = ({file}: {file?: any}) => {
  return (
    <div className=" p-2 bg-white/20 backdrop-blur-sm rounded-lg max-w-[300px] flex items-center gap-4 cursor-pointer">
    <div className='flex items-center gap-2'>
        {/* <div className="w-[48px] h-[48px] rounded-md overflow-hidden">
            <Image
        height={100}
        width={100} src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
        </div> */}
        <FileSkeleton fileType={file.type}/>
        <p className=''>{file?.name || "Kierra McAdam"}</p>
    </div>
    <Link target='_blank' href={file?.url}>
    <i className="fi fi-sr-download text-lg hover:text-green-400" />
    </Link>
    </div>
  )
}

export default FileTypeCard