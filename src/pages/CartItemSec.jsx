import React from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'


const CartItemSec = () => {
  const {cartItems, setCartItems} = useContext(CartItems)

  return (
    <div>CartItems</div>
  )
}

export default CartItemSec

