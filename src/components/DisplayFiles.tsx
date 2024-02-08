import { fileType } from '@/utils'
import Image from 'next/image'
import React from 'react'
import FileTypeCard from './FileTypeCard'

const DisplayFiles = ({fromSelf, avatar, file, msgTime, setZoom, index}: {index: number, fromSelf:boolean, avatar:string, file: fileType, msgTime: any, setZoom: any}) => {
    const today = {
        time: new Date().toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        }),
        day: new Date().toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        year: new Date(msgTime.seconds*1000).getFullYear()
      }
      
      const msgDate = {
        time: new Date(msgTime.seconds*1000).toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        }),
        // day: new Date(msgTime.seconds*1000).toDateString(),
        day: new Date(msgTime.seconds*1000).toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        year: new Date(msgTime.seconds*1000).getFullYear()
      }
  return (
    <div className='space-y-1'>
        {
            file.type.includes("text") ?
        <FileTypeCard file={file}/>
:
        <div className="relative">
        <object
        onClick={()=>setZoom(index, file)}
        // key={i}
        className={`cursor-zoom-in max-w-full w-[400px] max-h-[400px] object-contain`}
        type={file.type}
        data={file.url}
        />
        <a target="_blank" href={file.url} download={file.name} className="absolute bottom-2 right-2 border p-2 bg-black/20 hover:bg-green-500 rounded-full border-green-500">
        <i className="fi fi-sr-download text-lg" />
        </a>
        </div>
        }

        <p className={`${fromSelf ? 'flex-row justify-end' : 'flex-row-reverse justify-start'} flex items-start gap-2 text-xs`}>
          <p className=''>
          {today.day != msgDate.day && <p>{msgDate.day +  " " + ((today.year != msgDate.year) ? msgDate.year : "") }</p>}
          {today.time == msgDate.time ? "just now" : <p>{msgDate.time}</p>}
          </p>
          <Image height={100} width={100} className='w-[30px] h-[30px] rounded-full' src={avatar} alt="avatar" />
        </p>
        </div>
  )
}

export default DisplayFiles