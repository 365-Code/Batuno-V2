import React from 'react'

const ChatCard = () => {
  return (
    
    <div className="flex py-2 items-center justify-start gap-4 cursor-pointer hover:text-green-500">
    <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
        <img src="https://img.freepik.com/free-photo/view-3d-confident-businessman_23-2150709932.jpg?t=st=1705210759~exp=1705214359~hmac=fd5a10a8cb94fb6f8c6c19553a52d1d2c2ebc4856ca83543da774e896ed6fb67&w=740" alt="" className="res-img" />
    </div>
    <p>Kierra McAdam</p>
    </div>
  )
}

export default ChatCard