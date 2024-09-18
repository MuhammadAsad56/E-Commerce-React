import React from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'
import ProductsCard from '../components/ProductsCard'
import {db ,doc, deleteDoc} from "../utils/firebase";



const CartItemSec = () => {
  const {cartItems, setCartItems} = useContext(CartItems)
  
  
  // const handleRemoveCart = async (id) => {
  //   let itemId = String(id)
  //       await deleteDoc(doc(db,'cartitems',itemId))
  //       .then((res) => {
  //         setCartItems(cartItems.filter((data) => data.id != id))
  //       })
  //       .catch((err) => {
  //         console.log(err.message)  
  //       })
  // };
  
  return (
    <>
    <div className="flex flex-wrap my-10 px-3">
  {
    cartItems.map((data,ind) => {
      return(
          <ProductsCard handleRemoveCart={()=>handleRemoveCart(data.id)}  key={ind} data={data}/>
        )
      })
    }
    </div>
    </>
  )
}

export default CartItemSec
