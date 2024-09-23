import React, { useContext, useState } from 'react'
import "./heading.css"
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from "../utils/firebase"
import { FaUserCircle } from "react-icons/fa";
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
        <div className="flex flex-wrap p-5 flex-col md:flex-row items-center gap-5">
          <a className="flex m-0 title-font font-medium items-center text-gray-900 md:mb-0">
            <h2 className=" ml-3 text-2xl heading my-0">Shopping Bazar</h2>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap  items-center text-base justify-center">
            {headerLinks == "/home" ? ""
              :
              (
                <>
                  <Link onClick={() => setHeaderLinks("/home")} to={"/"} className={`mr-5 text-gray-800 ${headerLinks == "/home" && "border-b pb-2 text-lg border-b-red-400"}`}>Home</Link>

                  <Link onClick={() => setHeaderLinks("/products")} to={"/products"} className={`mr-5 text-gray-800 ${headerLinks == "/products" && "border-b pb-2 text-lg border-b-red-400"}`}>Products</Link>

                  <Link onClick={handleShowProduct} to={"cartitems"} className={` cursor-pointer  text-gray-800 ${headerLinks == "/cartitems" && "border-b pb-2 text-lg border-b-red-400"}`}>
                  Cart Items <sup>{cartItems.length}</sup>
                  </Link>
                </>
              )
            }
          </nav>
          {userAuthenticated ?
            <div className='flex items-center flex-wrap mr-3 justify-center gap-3'>
              <div className='flex gap-3'>
                {
                  userAuthenticated.photo ?
                    <img className='h-8 w-auto rounded-full' src={userAuthenticated.photo} alt="#" />
                    :
                    <FaUserCircle className='h-8 w-auto' />
                    
                } 
              </div>
              <div>
                <button onClick={handlleSignOut} className='btn px-2 py-1 bg-gray-300 rounded-sm hover:bg-gray-200'>Logout</button>
              </div>
            </div>
            : (
              <>
                <Link to={"/signup"}>
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0">
                    Sign Up
                  </button>
                </Link>
                <Link to={"/signin"}>
                  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0">
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