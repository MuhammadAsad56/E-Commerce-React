import React, { useEffect } from 'react'
import { useContext } from 'react'
import { CartItems } from '../context/AuthContext'
import ProductsCard from '../components/ProductsCard'
import { db, doc, deleteDoc } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Image } from 'antd';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
const CartItemSec = () => {
  const { cartItems, setCartItems, isCartAdded, updateToCart } = useContext(CartItems)

  useEffect(() => {
    async function fetchData() {
      const reference = collection(db, "cartitems")
      const res = await getDocs(reference)
      let items = [];
      res.forEach((doc) => {
        let obj = {
          ...doc.data(),
          dbId: doc.id,
        }
        items.push(obj)
      })

      setCartItems(items)
    }
    fetchData()
  }, [])

  const handleRemoveCart = async (dbId, id) => {
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
      <div className='flex flex-col flex-wrap my-10'>
        {
          cartItems.map((data, ind) => {
            const { brand, category, description, images, id, title, price, qty, dbId } = data
            return (
              // <ProductsCard handleRemoveCart={()=>handleRemoveCart(data.dbId, data.id)} isCartAdded={isCartAdded}  key={ind} data={data}/>
              <div className="flex flex-col sm:flex-row items-center lg:w-3/5 border-b p-5 mx-auto mb-10 border-gray-300 shadow-md gap-4 sm:justify-between">
                <Image src={images[0]} width={100} height={100} className="mx-auto sm:mx-0" />

                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                    {title}
                  </h2>
                  <p className="leading-relaxed text-base mb-2">
                    {description}
                  </p>
                  <p className='title-font text-lg font-medium'>Price: ${price}/-</p>

                  <div className='flex flex-col sm:flex-row gap-3 items-center mt-2'>
                    <button className="text-white bg-sky-400 rounded-md p-1 w-full sm:w-auto">
                      Added
                    </button>

                    <div className='flex items-center gap-2'>
                      <CiSquarePlus onClick={() => updateToCart(dbId, id, "plus")} className='text-sky-400' style={{ fontSize: 30 }} />
                      <p className='text-xl'>{qty}</p>
                      <CiSquareMinus onClick={() => {
                        if (qty <= 1) {
                          handleRemoveCart(dbId, id)
                        } else {
                          updateToCart(dbId, id, "minus")
                        }
                      }} className='text-sky-400' style={{ fontSize: 30 }} />
                    </div>

                    <button onClick={() => handleRemoveCart(dbId, id)} className="text-white bg-sky-400 rounded-md p-1 w-full sm:w-auto">
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>


            )
          })
        }
      </div>
    </>
  )
}

export default CartItemSec
