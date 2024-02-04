import React from 'react'

const FileSkeleton = ({fileType}: {fileType?: string}) => {
    const type = fileType?.split('/')[0]

  return (
    <div>
        
        
        <div className='h-[40px] w-[40px] rounded-lg flex flex-col items-center justify-center'>
            {
                type == "text" ? <i className="fi fi-sr-document file-icon" /> :
                type == "image" ? <i className="fi fi-sr-file-image file-icon"></i> :
                <i className="fi fi-sr-file-pdf file-icon" /> 
                // type == "doc" ?  <i className="fi fi-sr-file-pdf file-icon" />  :
            }
        </div>
    </div>
  )
}

export default FileSkeleton