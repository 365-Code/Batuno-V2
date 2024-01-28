import Image from 'next/image'
import React from 'react'

const WelcomeSection = () => {
  return (
    <section className='hidden sm:flex bg-green-50 shadow-sm shadow-black/30 flex-1 flex-col justify-center items-center text-center'>
        <div className='max-w-[400px] max-h-[400px] rounded-full'>
        <Image height={500} width={500} src="/welcome.jpg" alt="" className='res-img pointer-events-none' />
        </div>
        <h1 className='text-4xl text-center text-green-500 animate-pulse'>Batuno V2</h1>
    </section>
  )
}

export default WelcomeSection