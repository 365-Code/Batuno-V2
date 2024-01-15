"use client"
import React from 'react'
import Msg from './Msg'

const MsgSection = () => {

  return (
    <section className="relative flex-1 bg-[#f4f6f3] w-[500px]">
      
      <div id="heading" className='w-full h-[65px]  flex items-center gap-4 top-0 left-0 absolute bg-black/20 backdrop-blur-sm px-2'>

        <h3 className='text-lg font-semibold py-4'>Coffee Nerds</h3>

        <div className='relative flex items-center h-[36px] w-[80px] py-4 justify-center'>
            <div className="absolute top-0 left-0 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
            <div className="absolute top-0 left-4 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
            <div className="absolute top-0 left-8 w-[36px] h-[36px] rounded-full overflow-hidden">
              <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
            </div>
        </div>
        <p className='text-green-500 font-semibold text-lg'>+3</p>

      </div>

      <div id="messages" className='pt-16 h-full overflow-y-scroll no-scrollbar'>
        
      </div>
      <div id="send"></div>
    </section>
  )
}

export default MsgSection