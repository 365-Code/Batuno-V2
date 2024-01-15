import React from 'react'
import FileCard from './FileCard'
import ToggleButton from './ToggleButton'

const DetailsSection = () => {

  return (
    <section className="w-[300px] space-y-4">

      <div className='flex justify-end w-full py-2'>
        <button className='hover:text-green-400'>
          <i className="fi fi-sr-cross-small" />
        </button>
      </div>

      <div id="otherprofile" className='space-y-4 text-center'>
        <div>
          <div className="w-[108px] h-[108px] mx-auto rounded-full overflow-hidden text-center">
          <img src="https://img.freepik.com/free-photo/young-woman-with-round-glasses-yellow-sweater_273609-7091.jpg?size=626&ext=jpg&ga=GA1.1.2058463804.1704785941&semt=ais" alt="" className="res-img" />
          </div>
          <h3 className='text-lg font-semibold'>Kierra McAdams</h3>
          <p className='text-sm font-semibold text-green-400'>Co-founder @ Coffee Country</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <i className="fi fi-sr-phone-flip rotate-90 p-4 border rounded-full hover:text-white hover:bg-green-400 cursor-pointer" />
          <i className="fi fi-sr-beacon p-4 border rounded-full hover:text-white hover:bg-green-400 cursor-pointer" />
          <i className="fi fi-sr-video-camera-alt p-4 border rounded-full hover:text-white hover:bg-green-400 cursor-pointer" />
        </div>
      </div>
      
      <div id="otherfiles" className='max-h-[200px] overflow-y-scroll no-scrollbar'>
        <h3 className='text-slate-500'>Shared files</h3>
        <FileCard/>
        <hr />
      </div>
      <div id="options" className='space-y-2'>
        <div className='py-4 flex items-center justify-between'>
          <p className='text-slate-500'>
            Add to Favourites
          </p>
          <label htmlFor="addToFavourite" className=''>
            <ToggleButton/>
          </label>
          <input type='checkbox' className='hidden' id='addToFavourite' />
        </div>
        <hr />
        <button className='py-4 hover:text-red-400'>Delete this Contact</button>
        <hr />
        <button className='py-4 text-red-400'>Block this Contact</button>
      </div>

    </section>
  )
}

export default DetailsSection