import React from 'react'
import ChatCard from './ChatCard'

const ChatsSection = () => {
  return (
    
    <section className="w-[300px] gap-2 flex flex-col">

        <div id="search" className='bg-[#dbdcff] rounded-lg flex items-center py-1 px-2'>
          <i className="fi fi-rr-search" />
          <input type="search" className='border-none outline-none bg-transparent py-1 px-2'/>
        </div>

        <div id="favourites" className='h-auto'>
          <h3 className='text-gray-500 py-1'>Favourites</h3>
          <div className='h-[140px] overflow-y-scroll custom-scrollbar'>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
          </div>
        </div>
    
        <div id="all-chats" className='h-auto'>
          <h3 className='text-gray-500 py-1'>All Chats</h3>
          <div className='h-[240px] overflow-y-scroll custom-scrollbar'>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
          </div>
        </div>

        <div id="group" className='h-full'>
          <h3 className='text-gray-500 py-1'>Groups</h3>
          <div className='h-[140px] overflow-y-scroll custom-scrollbar'>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
          </div>
        </div>

    </section>
  )
}

export default ChatsSection