import React from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'
import ProductsCard from '../components/ProductsCard'


const CartItemSec = () => {
  const {cartItems, setCartItems} = useContext(CartItems)
  
  return (
    <>
    <div className="flex flex-wrap my-10 px-3">
  {
    cartItems.map((data,ind) => {
      return(
          <ProductsCard  key={ind} data={data}/>
        )
      })
    }
    </div>
    </>
  )
}

export default CartItemSec

