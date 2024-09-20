import React from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'
import ProductsCard from '../components/ProductsCard'
import {db ,doc, deleteDoc} from "../utils/firebase";



const CartItemSec = () => {
  const {cartItems, setCartItems , isCartAdded} = useContext(CartItems)
  

  // const handleRemoveCart = (id) => {
  //   try {
  //     const updatedCartItems = cartItems.filter((data) => data.id !== id);
  //     console.log("Updated CartItems without Firebase:", updatedCartItems);
  //     setCartItems([...updatedCartItems]);
  //   } catch (err) {
  //     console.error("Error caught:", err.message);
  //   }
  // };
  
  
  // const handleRemoveCart = async (id) => {
  //   try {
  //     // Ensure ID is a string
  //     const docId = String(id); // Convert to string
      
  //     await deleteDoc(doc(db, 'cartitems', docId))
  //     .then(res => {
  //       const updatedCartItems = cartItems.filter((data) => data.id !== id);
  //       setCartItems(updatedCartItems);
  //     }).catch(err => console.log(err))
  
  //   } catch (err) {
  //     console.error("Error caught during Firebase delete:", err.message);
  //   }
  // };
  
  return (
    <>
    <div className="flex flex-wrap my-10 px-3">
  {
    cartItems.map((data,ind) => {
      return(
          <ProductsCard isCartAdded={isCartAdded}  key={ind} data={data}/>
        )
      })
    }
    </div>
    </>
  )
}

export default CartItemSec
