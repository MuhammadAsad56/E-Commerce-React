import React, { useContext, useState } from 'react'
import "./heading.css"
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from "../utils/firebase"
import { CartItems, HeaderLinksContext } from '../context/AuthContext'

const Header = ({ userAuthenticated }) => {
  const { cartItems, setCartItems } = useContext(CartItems)
  const { headerLinks, setHeaderLinks } = useContext(HeaderLinksContext)

  const handlleSignOut = () => {
    signOut(auth)
      .then(() => console.log("signOut"))
      .catch((err) => alert(err.message))
  }

  const handleShowProduct = () => {
    setHeaderLinks("/cartitems")
  }
  
  return (
    <>
      <header className="text-gray-600 body-font bg-slate-50">
        <div className="flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <h2 className="ml-3 text-2xl heading">Shopping Bazar</h2>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            {headerLinks == "/home" ? ""
              :
              (
                <>
                  <Link onClick={() => setHeaderLinks("/home")} to={"/"} className={`mr-5 text-gray-800 ${headerLinks == "/home" && "border-b pb-2 text-lg border-b-red-400"}`}>Home</Link>

                  <Link onClick={() => setHeaderLinks("/products")} to={"/products"} className={`mr-5 text-gray-800 ${headerLinks == "/products" && "border-b pb-2 text-lg border-b-red-400"}`}>Products</Link>

                  <Link onClick={handleShowProduct} to="/cartitems" className={` cursor-pointer  text-gray-800 ${headerLinks == "/cartitems" && "border-b pb-2 text-lg border-b-red-400"}`}>
                          Cart Items <sup>{cartItems.length}</sup>
                   
                  </Link>
                </>
              )
            }
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