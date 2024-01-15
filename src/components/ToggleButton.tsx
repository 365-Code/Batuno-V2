"use client"
import React, { useState } from 'react'

const ToggleButton = () => {
    const [toggle, setToggle] = useState(false)
  return (
    <button onClick={()=>setToggle(toggle? false: true)} className={`rounded-full w-[40px] group/toggle h-[25px] transition-all flex items-center ${toggle ? 'bg-green-300 justify-end' : 'justify-start bg-slate-300'} `}>
        <div className={`h-[15px] mx-1 w-[15px] bg-black rounded-full`}/>
    </button>
  )
}

export default ToggleButton