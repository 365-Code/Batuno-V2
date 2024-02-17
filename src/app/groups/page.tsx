"use client"
import GroupChatSection from '@/components/GroupChatSection'
import GroupCreate from '@/components/GroupCreate'
import NavSection from '@/components/NavSection'
import React, { useState } from 'react'

const Page = () => {
    const [newGroup, setNewGroup] = useState(false)
  return (
    <main className="h-screen flex items-center justify-center md:p-4">
      <div className="max-w-full w-full h-full flex md:justify-center">
        <NavSection />
            <GroupChatSection newGroup={newGroup} setNewGroup={setNewGroup}/>
            <GroupCreate newGroup={newGroup} setNewGroup={setNewGroup}/>
        {/* <GroupMsgSection/> */}
      </div>
    </main>
  )
}


export default Page