// import { createContext, useState } from "react";

import React, { createContext, useState , useEffect, useCallback} from 'react'
import { auth } from "../utils/firebase";
import { db } from "../utils/firebase";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";


export const AuthContext = createContext()

 export function AuthContextProvider({children}){
    const [authValues, setAuthValues] = useState({
        name: "",
        email: "",
        pass: ""
    })
    return(
        <AuthContext.Provider value={{authValues, setAuthValues}}>{children}</AuthContext.Provider>
    )
}
export const CartItems = createContext()

 export function CartItemsProvider({children}){
    const [cartItems, setCartItems] = useState([])
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
          if(user){
            setAuthenticated(true)
          }else{
            setAuthenticated(false)
          }
        })
      },[])

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

    const handleAddCartItem = useCallback(
        async (item) => {          
            const cartItemsArr = cartItems;
            const isAdded = cartItemsArr.findIndex((data) => data.id === item.id)
            if (isAdded == -1) { 
              cartItemsArr.push({...item, qty: 1})  
              item.qty = 1  
              const ref = await addDoc(collection(db, "cartitems"), item);
              setCartItems([...cartItemsArr])
            }
            else{ 
              const reference = collection(db, "cartitems")
              const res = await getDocs(reference)
              let arr = [];
                res.forEach((doc) => {
                  let obj = {
                    ...doc.data(),
                    dbId : doc.id,
                  }  
                  arr.push(obj)
                }) 
                const findItem = arr.find(data => data.id === item.id)  
                const ref = doc(db, "cartitems", findItem.dbId)
                await updateDoc(ref, {
                qty : findItem.qty + 1
                })
                cartItemsArr[isAdded].qty++
            }
            setCartItems([...cartItemsArr])
        },
        [cartItems]
      )

     const isCartAdded = (item) => {
        const arr = cartItems;
        const itemIndex = arr.findIndex((data) => data.id === item.id);
        if(itemIndex == -1){
            return null
        }else{
            return arr[itemIndex]
        }

     }

     async function updateToCart(dbId ,id, type) {
      const arr = [...cartItems];
      const itemObj = arr.find((data) => data.id == id);
      const itemInd = arr.findIndex((data) => data.id == id);
      if (type == "plus") {
        const ref = doc(db, "cartitems", dbId)
        await updateDoc(ref, {
        qty : itemObj.qty + 1
        })
        arr[itemInd].qty++;
      } else {
        const ref = doc(db, "cartitems", dbId)
        await updateDoc(ref, {
        qty : itemObj.qty - 1
        })
        arr[itemInd].qty--;
      }
  
      setCartItems([...arr]);
    }

    return(
        <CartItems.Provider value={{cartItems, setCartItems, handleAddCartItem, isCartAdded, updateToCart, authenticated }}>{children}</CartItems.Provider>
    )
}

// export const CardAdded = createContext()

//  export function CardAddedProvider({children}){
//     const [isCardAdded, setIsCardAdded] = useState(false)
//     return(
//         <CardAdded.Provider value={{isCardAdded, setIsCardAdded}}>{children}</CardAdded.Provider>
//     )
// }
export const HeaderLinksContext = createContext()

 export function HeaderLinksContextProvider({children}){
    const [headerLinks, setHeaderLinks] = useState("/home")
    return(
        <HeaderLinksContext.Provider value={{headerLinks, setHeaderLinks}}>{children}</HeaderLinksContext.Provider>
    )
}
export const CartProductContext = createContext()

 export function CartProductContextProvider({children}){
    const [showCartProduct, setShowCartProduct] = useState(false)
    return(
        <CartProductContext.Provider value={{showCartProduct, setShowCartProduct}}>{children}</CartProductContext.Provider>
    )
}
