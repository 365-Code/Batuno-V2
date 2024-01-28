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
  // console.log(today);
  // console.log(msgDate);

  return (
    <div ref={scrollRef} className={`py-1 gap-1 flex flex-col ${fromSelf? 'items-end' : 'items-start'}`}>
        <p className={`selection:text-pink-500 selection:bg-pink-500 rounded-md p-4 w-fit max-w-full sm:max-w-[400px] ${fromSelf ? 'bg-green-400/30 backdrop-blur-sm' : 'bg-white'} `}>
            {msg}
        </p>
        <p className={`${fromSelf ? 'flex-row text-right' : 'flex-row-reverse text-left'} flex items-start gap-2 text-sm`}>
          <p className=''>
          {today.time == msgDate.time ? "just now" : <p>{msgDate.time}</p>}
          {today.day != msgDate.day && <p>{msgDate.day +  " " + ((today.year != msgDate.year) ? msgDate.year : "") }</p>}
          </p>
          <img className='w-[40px] h-[40px] rounded-full' src={avatar} alt="" />
        </p>
    </div>
  )
}

export default Msg