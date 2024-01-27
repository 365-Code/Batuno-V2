"use client"
import React, { useEffect, useRef } from 'react'

const Msg = ({msg, fromSelf, avatar, msgTime}: {msg: string, fromSelf: boolean, avatar?: string, msgTime?: any}) => {
  
  const scrollRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [])


  const today = {
    time: new Date().toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    }),
    day: new Date().toDateString()
  }
  
  const msgDate = {
    time: new Date(msgTime.seconds*1000).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    }),
    day: new Date(msgTime.seconds*1000).toDateString()
  }
  // console.log(today);
  // console.log(msgDate);

  // console.log(today == msgDate);

  return (
    <div ref={scrollRef} className={`py-1 gap-1 flex flex-col ${fromSelf? 'items-end' : 'items-start'}`}>
        <p className={`selection:text-pink-500 selection:bg-pink-500 rounded-md p-4 w-fit max-w-full sm:max-w-[400px] ${fromSelf ? 'bg-green-400/30 backdrop-blur-sm' : 'bg-white'} `}>
            {msg}
        </p>
        <p className='flex items-start gap-2 text-sm'>
          {today.time == msgDate.time ? "just now" : <p>{msgDate.time}</p>}
          {today.day != msgDate.day && <p>{msgDate.day}</p>}
          <img className='w-[40px] h-[40px] rounded-full' src={avatar} alt="" />
        </p>
    </div>
  )
}

export default Msg