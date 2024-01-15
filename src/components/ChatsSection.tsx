import React from 'react'
import ChatCard from './ChatCard'
import { avatars, users } from '@/utils'

const ChatsSection = () => {
  return (
    <section className="w-[300px] px-0 gap-2 flex flex-col">
        <div id="search" className='bg-[#dbdcff] px-4 mx-4 rounded-lg flex items-center py-1'>
          <i className="fi fi-rr-search" />
          <input type="search" placeholder='Search User' className='w-full border-none outline-none bg-transparent py-1 px-2'/>
        </div>

        <div id="favourites" className='h-auto'>
          <h3 className='text-slate-500 py-1 px-4'>Favourites</h3>
          <div className='h-[140px] overflow-y-scroll custom-scrollbar'>
            {
              users.map((u, i) => i>3 && <ChatCard key={u.uId} cName={u.name} avatar={avatars[i]}/>)
            }
          </div>
        </div>
    
        <div id="all-chats" className='h-auto'>
          <h3 className='text-slate-500 py-1 px-4'>All Chats</h3>
          <div className='h-[240px] overflow-y-scroll custom-scrollbar'>
            {
              users.map((u, i) => <ChatCard key={u.uId} cName={u.name} avatar={avatars[i]}/>)
            }
          </div>
        </div>

        <div id="group" className='h-full'>
          <h3 className='text-slate-500 py-1 px-4'>Groups</h3>
          <div className='h-[140px] overflow-y-scroll custom-scrollbar'>
            <ChatCard cName='Coffee Nerds' active={true}/>
            <ChatCard cName='App Chemistry' active={false}/>
          </div>
        </div>

    </section>
  )
}

export default ChatsSection