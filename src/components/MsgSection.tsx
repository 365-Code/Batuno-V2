"use client"
import React, { useEffect, useState } from 'react'
import Msg from './Msg'
import { messages, users } from '@/utils'

const MsgSection = () => {

  const currentUser= users[0];
  const chatUser = users[1];
  const [msgs, setMsgs] = useState([] as Array<object>)

  useEffect(() => {
    const chats = messages.find((msg) => msg.users.find((u) => (u == currentUser.uId) ))
    if(chats){
      setMsgs(chats.chat)
    }
  }, [])

  return (
    <section className="relative h-full flex-1 flex flex-col justify-between backdrop-blur-sm bg-[#f4f6f3] w-[500px]">
      <img className='h-full w-full object-fill object-center absolute top-0 left-0 -z-[1] opacity-25' src="https://img.freepik.com/premium-vector/vector-mosaic-seamless-pattern-with-geometric-shapes-retro-memphis-style-fashion-8090s_547648-1314.jpg?w=740" alt="" />
      <div id="heading" className='w-full h-[65px] z-[2] flex items-center gap-4 top-0 left-0 absolute bg-black/20 backdrop-blur-sm px-4'>

        <h3 className='text-2xl py-4'>Coffee Nerds</h3>

        <div className='relative flex items-center h-[36px] w-[72px] py-4 justify-center'>
            <div className="absolute z-[2] top-0 left-0 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
            <div className="absolute z-[1] top-0 left-4 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
            <div className="absolute top-0 left-8 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
        </div>
        <p className='text-green-500 text-xl'>+3</p>

      </div>

      <div id="messages" className='h-[90%] pt-16 overflow-y-scroll no-scrollbar'>
        {
          msgs.map((msg: any, i) =>
            msg.sender == currentUser.uId
            ? <Msg msg={msg.text} fromSelf={true}/>
            : <Msg msg={msg.text} fromSelf={false}/>
          )
        }
      </div>

      <div id="send" className='flex gap-6 items-center justify-between max-w-full'>
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
        </div>

          <div className='bg-white focus-within:ring-green-500 focus-within:ring-1 rounded-md flex-1 flex items-center px-4 gap-4'>
            <input type="text" className='w-full py-4 outline-none' placeholder='Write a reply'/>
            <div className='flex gap-4 items-center'>
              <i className="fi fi-sr-clip hover:text-green-500 cursor-pointer text-xl" />
              <i className="fi fi-sr-smile-plus hover:text-green-500 cursor-pointer text-xl" />
            </div>
          </div>

          <button className='flex items-center gap-2 rounded-md px-6 py-4 bg-green-400 hover:bg-green-500 text-white'>
          <i className="fi fi-sr-paper-plane" />
            Send
          </button>
      </div>

    </section>
  )
}

export default MsgSection