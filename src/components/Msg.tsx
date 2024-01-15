import React from 'react'

const Msg = ({msg, fromSelf}: {msg: string, fromSelf: boolean}) => {
  return (
    <div className={`py-1 flex ${fromSelf? 'justify-end' : 'justify-start'}`}>
        <p className={`py-3 rounded-md px-2 border w-fit max-w-[50%] bg-blue-200`}>
            {msg}
        </p>
    </div>
  )
}

export default Msg