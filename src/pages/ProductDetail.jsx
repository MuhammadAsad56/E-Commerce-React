import React, { useEffect, useState,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartItems } from '../context/AuthContext'
import Loading from '../components/Loading'
import { auth } from '../utils/firebase'


const ProductDetail = () => {
    const [product , setProduct] = useState("")
    const [loading , setLoading] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const {cartItems, setCartItems} = useContext(CartItems)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
      setLoading(true)
      fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(product => setProduct(product));
      setLoading(false)
      auth.onAuthStateChanged(user =>{
        if(user){
         setAuthenticated(true)
        }else{setAuthenticated(false)}
      })
    },[id])
     let {thumbnail ,brand, price , rating, description} = product

     const handleAddCart = (item) => {
      if(authenticated){
        const cartItemsArr = [...cartItems]
        const isAdded = cartItemsArr.findIndex((data) => data.id === item.id) !== -1
        console.log(isAdded);
        if(!isAdded){
         cartItemsArr.push(item)
         setCartItems([...cartItemsArr])
      }
     }else{
      alert("please Sign up your account")
      navigate("/signup")
     }
    }

  return (
    <>
    {
    loading ? <Loading/> :
    (
       <section className="text-gray-600 body-font overflow-hidden">
       <div className="container px-5 py-24 mx-auto">
         <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
           <img
             alt="Loading..."
             className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
             src={thumbnail}
           />
           <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
             <h2 className="text-sm title-font text-gray-500 tracking-widest">
               BRAND NAME
             </h2>
             <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
               {brand}
             </h1>
             <div className="flex mb-4">
               <span className="flex items-center">
                 <svg
                   fill="currentColor"
                   stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   className="w-4 h-4 text-indigo-500"
                   viewBox="0 0 24 24"
                 >
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                 </svg>
                 <svg
                   fill="currentColor"
                   stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   className="w-4 h-4 text-indigo-500"
                   viewBox="0 0 24 24"
                 >
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                 </svg>
                 <svg
                   fill="currentColor"
                   stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   className="w-4 h-4 text-indigo-500"
                   viewBox="0 0 24 24"
                 >
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                 </svg>
                 <svg
                   fill="none"
                   stroke="currentColor"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   className="w-4 h-4 text-indigo-500"
                   viewBox="0 0 24 24"
                 >
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                 </svg>
                 <span className="text-gray-600 ml-3">{rating}</span>
               </span>
               <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
               </span>
             </div>
             <p className="leading-relaxed">
               {description}
             </p>
             <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
             </div>
             <div className="flex">
               <span className="title-font font-medium text-2xl text-gray-900">
                 {price}
               </span>
               <button onClick={()=>handleAddCart(product)} className="flex ml-auto text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded">
                 Add to cart
               </button>
             </div>
           </div>
         </div>
       </div>
     </section>
     
    )}
     
    </>
  )
}

export default ProductDetail