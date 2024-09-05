import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"

const ProductDetail = () => {
    const [product , setProduct] = useState(null)
    const { id} = useParams()
    

    useEffect(()=> {
      fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(product => setProduct(product));
    },[id])
    console.log(product);

  return (
    <>
    {product ? (
        <div className='container'>
            <div className='box'>
                 <div className='image-section'>
                    <img src={product.images[0]} alt="" />
                 </div>
                 <div className='text-section'>
                    <h1>{product.title}</h1>
                    <h2>price: {product.price}</h2>
                    <p>Description: {product.description}</p>
                 </div>
            </div>
        </div>
    ) : null}
     
    </>
  )
}

export default ProductDetail