import React from 'react'

const Modal = ({compo, showModal}: {compo: any, showModal: boolean}) => {
  return (
    <div id='modal' className={`${showModal ? "w-screen h-screen p-4 top-0 left-0 mx-auto my-auto" : "w-0 h-0 p-0 overflow-hidden top-1/2 left-1/2"} flex justify-center items-center absolute bg-white/30 backdrop-blur-sm`}>
        {compo}
    </div>
  )
}

export default Modal