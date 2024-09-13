import React, { useContext, useState } from 'react'
import "./heading.css"
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from "../utils/firebase"
import { CartItems } from '../context/AuthContext'

const Header = ({ userAuthenticated }) => {
  const [borderbottom, setBorderBottom] = useState("home")
  const {cartItems, setCartItems } = useContext(CartItems)
  const [showCartProduct , setShowCartProduct] = useState(false)


  const handlleSignOut = () => {
    signOut(auth)
      .then(() => console.log("signOut"))
      .catch((err) => alert(err.message))
  }

  const handleShowProduct = () => {
    setShowCartProduct(!showCartProduct)
    setBorderBottom("cartitems")
  }

  const checkCardItemsLink = showCartProduct ? "/products" : "/cartitems"

  return (
    <>
      <header className="text-gray-600 body-font bg-slate-50">
        <div className="flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <h2 className="ml-3 text-2xl heading">Shopping Bazar</h2>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link onClick={() => setBorderBottom("home")} to={"/"} className={`mr-5 text-gray-800 ${borderbottom == "home" && "border-b pb-2 text-lg border-b-red-400"}`}>Home</Link>
            <Link onClick={() => setBorderBottom("products")} to={"/products"} className={`mr-5 text-gray-800 ${borderbottom == "products" && "border-b pb-2 text-lg border-b-red-400"}`}>Products</Link>
            {/* <div className='cursor-pointer  text-gray-700'> */}
              <Link onClick={handleShowProduct} to={checkCardItemsLink} className={` cursor-pointer  text-gray-800 ${borderbottom == "cartitems" && "border-b pb-2 text-lg border-b-red-400"}`}>
               {showCartProduct ? "Show All product" : 
                (
                <>
                Cart Items <sup>{cartItems.length}</sup>
                </>
                )
                }
                </Link>
            {/* </div> */}
          </nav>
          {userAuthenticated ?
            <div className='flex items-center gap-5'>
              <div className='flex gap-3'>
                <img className='h-8 w-auto' src={userAuthenticated.photo} alt="" />
                <h2 className=' text-center text-xl text-blue-500'>{userAuthenticated.email}</h2>
              </div>
              <button onClick={handlleSignOut} className='btn px-2 bg-gray-300 rounded-sm hover:bg-gray-200'>Logout</button>
            </div> : (
              <>
                <Link to={"/signup"}>
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mr-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    Sign Up
                  </button>
                </Link>
                <Link to={"signin"}>
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 mr-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    Sign In
                  </button>
                </Link>
              </>
            )
          }
        </div>
      </header>
    </>
  )
}

export default Header