import React from 'react'

const Heading = ({title, id,ind}) => {
  return (
    <>
    <div key={id}>
        <h1 className='text-2xl my-2 font-mono text-white bg-black'><span>{ind + 1}{") "}</span>{title}</h1>
    </div>
    </>
  )
}

export default Heading