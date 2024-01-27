"use client"
import { useAuth } from '@/context/AuthState'
import { avatars } from '@/utils'
import React, { ChangeEvent, useState } from 'react'

const Page = () => {

    const {currentUser} = useAuth()
    const [user, setUser] = useState({
        username: currentUser.username,
        avatar: currentUser.avatar, 
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setUser((preVal) => ({...preVal, [name]: value}))
    }

  return (
    <div className='shadow-sm shadow-green-400/40 p-4 w-[350px] mx-auto space-y-2 rounded-lg'>
        <div className='space-y-2 text-center'>
            <img src={currentUser.avatar || avatars[4]} alt="" className='mx-auto w-[200px] h-[200px] rounded-full'/>
            <p className='text-green-300'>{currentUser.uid}</p>
        </div>
        <div className='space-y-2'>
            <div>
                <p>Username</p>
                <input type="text" name='username' onChange={handleChange} value={user.username} className='focus-visible:border-green-500 w-full border outline-none transition-all px-4 py-2 rounded-lg'/>
            </div>
            <div>
                <p>Email</p>
                <input disabled value={currentUser.email} type="text" className='focus-visible:border-green-500 w-full border outline-none transition-all p-2 rounded-lg'/>
            </div>
            <div>
                <p>Phone No</p>
                <input type="tel" className='focus-visible:border-green-500 w-full border outline-none transition-all px-4 py-2 rounded-lg'/>
            </div>

        </div>

    </div>
  )
}

export default Page