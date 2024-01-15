import React from 'react'

const Msg = ({msg, fromSelf}: {msg: string, fromSelf: boolean}) => {
  return (
    <div className={`py-1 flex ${fromSelf? 'justify-end' : 'justify-start'}`}>
        <p className={`rounded-md p-4 w-fit max-w-full sm:max-w-[400px] ${fromSelf ? 'bg-green-400/30 backdrop-blur-sm' : 'bg-white'} `}>
            {msg}
        </p>
    </div>
  )
}

export default Msg