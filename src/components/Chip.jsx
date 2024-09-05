import React from 'react'

const Chip = ({data, onClick, isChosen}) => {
  // console.log("isChosen=>", isChosen);
  
  return (
    <div className='flex'>
        <h1 onClick={onClick} className={`${isChosen ? "bg-blue-500 text-white" : "bg-white text-black"} cursor-pointer shadow-sm text-xl border border-gray-300 mx-2 p-2 px-4 my-2`}>{data}</h1>
    </div>
  )
}

export default Chip