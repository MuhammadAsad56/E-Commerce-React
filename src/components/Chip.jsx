import React from 'react'

const Chip = ({data, onClick, isChosen}) => {
  // console.log("isChosen=>", isChosen);
  
  return (
    <div>
        <h1 onClick={onClick} className={`${isChosen ? "bg-sky-500 text-white" : "bg-white text-black"} cursor-pointer shadow-sm text-xl border  border-gray-300 mx-1 py-1 px-3 my-1`}>{data}</h1>
    </div>
  )
}

export default Chip