import Image from 'next/image'
import React from 'react'

const FileCard = () => {
  return (
    <div className="flex py-2 items-center justify-between gap-4 cursor-pointer">
    <div className='flex items-center gap-4'>
        <div className="w-[48px] h-[48px] rounded-md overflow-hidden">
            <Image
        height={100}
        width={100} src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
        </div>
        <p>Kierra McAdam</p>
    </div>
    <i className="fi fi-sr-download text-lg hover:text-green-400" />
    </div>
  )
}

export default FileCard