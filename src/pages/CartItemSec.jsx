import React, { useEffect } from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'
import ProductsCard from '../components/ProductsCard'
import {db ,doc, deleteDoc} from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const CartItemSec = () => {
  const {cartItems, setCartItems , isCartAdded,} = useContext(CartItems)

  useEffect(() => {
    async function fetchData(){
      const reference = collection(db, "cartitems")
      const res = await getDocs(reference)
      let items = [];
        res.forEach((doc) => {
          let obj = {
            ...doc.data(),
            dbId : doc.id,
          }  
          items.push(obj)
        })
        
        setCartItems(items)
    }
      fetchData()
   } ,[])

  const handleRemoveCart = async (dbId,id) => {
    console.log("dbId=>", dbId, "id=>", id);
    
    try {    
      await deleteDoc(doc(db, 'cartitems', dbId))
      .then(res => {
        const updatedCartItems = cartItems.filter((data) => data.id !== id);
        setCartItems(updatedCartItems);
      }).catch(err => console.log(err))
  
    } catch (err) {
      console.error("Error caught during Firebase delete:", err.message);
    }
  };

  return (
    <>
    {/* <div className='flex items-center justify-center my-3 gap-5'>
      <div className='px-6 py-4 border border-gray-300 shadow-md text-center'>
      <p className='text-xl'>Total Quantity</p>
      <p className='text-xl'>890</p>
      </div>
      <div className='px-6 py-4 border border-gray-300 shadow-md text-center'>
      <p className='text-xl'>Total Rs</p>
      <p className='text-xl'>{Math.round({price})}</p>
      </div>
      <div className='px-6 py-4 border border-gray-300 shadow-md text-center'>
      <p className='text-xl'>Total Rs</p>
      <p className='text-xl'>77889</p>
      </div>

    </div> */}
    <div className="flex flex-wrap my-10 px-3">
  {
    cartItems.map((data,ind) => {
      return(
          <ProductsCard handleRemoveCart={()=>handleRemoveCart(data.dbId, data.id)} isCartAdded={isCartAdded}  key={ind} data={data}/>
        )
      })
    }
    </div>
    </>
  )
}

export default CartItemSec
