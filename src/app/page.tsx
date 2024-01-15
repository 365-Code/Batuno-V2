import ChatsSection from '@/components/ChatsSection'
import DetailsSection from '@/components/DetailsSection'
import MsgSection from '@/components/MsgSection'
import NavSection from '@/components/NavSection'
import React from 'react'

const Home = () => {
  return (
    


<main className="h-screen flex items-center justify-center p-4">
  <div className="w-full h-full flex shadow-sm shadow-black/50"> 
  <NavSection/>
  <ChatsSection/>
  <MsgSection/>
  <DetailsSection/>
  </div>
</main>

  )
}

export default Home