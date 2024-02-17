"use client"
import { useAuth } from '@/context/AuthState'
import { auth, db } from '@/utils/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

    const {currentUser} = useAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if(u){
                nav.push('/')
            }
        })
    }, [auth])
    
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const nav = useRouter()

    const handleChange = (e: any)=>{
        const {name, value} = e.target 
        setUser((preVal: any) => ({...preVal, [name]: value}) )
    }

    
    const login = async ()=>{
        try{
            await signInWithEmailAndPassword(auth, user.email, user.password)
            toast.success("Log In Successful")
            nav.push('/')
        } catch (error: any ){
            toast.error(error.code.toString().split('/')[1])
            return error
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        login()
    }


  return (
    <main className='w-screen h-screen flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='bg-[#f8f8f8] dark:bg-[#0d121b] max-w-full w-[450px] rounded-lg h-auto flex flex-col items-center gap-4 p-4 sm:p-8'>
            <h1 className='text-3xl font-semibold tracking-normal'>Batuno Chat</h1>
            <h2 className='text-2xl'>Login</h2>
            <input name='email' value={user.email} onChange={handleChange} type="email" placeholder='Email' className='input-fill w-full border focus:border-green-500 p-4 rounded-lg' />
            <input name='password' value={user.password} onChange={handleChange} type="password" placeholder='Password' className='input-fill tracking-wider w-full border focus:border-green-500 p-4 rounded-lg' />
            <div className='flex items-center justify-between w-full'>
                <Link href="/auth/register" className='outline-none hover:underline text-sm text-green-400 hover:text-green-500'>New Registeration?</Link>
                <Link href="/" className='outline-none focus-visible:underline text-sm hover:text-pink-400'>Forgot Password?</Link>
            </div>
            <button type='submit' className='focus-within:outline-green-50 p-4 text-white bg-green-400 hover:bg-green-500 w-full'>
                Login
            </button>
        </form>
    </main>
  
  )
}

export default Page