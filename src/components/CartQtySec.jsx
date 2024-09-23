import React from 'react'

const CartQtySec = ({text, onClick,style}) => {
  return (
 <div 
  onClick={onClick} 
  className={`${style} text-center flex-grow border-b border-gray-200 shadow-md rounded flex justify-center items-center p-3 
              md:p-5 sm:p-2`}>
    <h1 className="md:text-2xl sm:text-base text-xl font-semibold">{text}</h1>
</div> 
  )
}

export default CartQtySec