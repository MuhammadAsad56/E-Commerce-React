// import { createContext, useState } from "react";

import React, { createContext, useState , useEffect, useCallback} from 'react'
import { auth } from "../utils/firebase";
import { db } from "../utils/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";


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

    const handleAddCartItem = useCallback(
        async (item) => {
          if (authenticated) {
            const cartItemsArr = [...cartItems];
            const isAdded = cartItemsArr.findIndex((data) => data.id === item.id);
            console.log("isAdded=>,", isAdded)

            if (isAdded == -1) { 
              cartItemsArr.push(item)          
              const ref = await addDoc(collection(db, "cartitems"), item);
            }
            setCartItems([...cartItemsArr])
            console.log(cartItemsArr)
            
          } else {
            alert("Please sign up your account");
            navigate("/signup");
          }
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

    
    return(
        <CartItems.Provider value={{cartItems, setCartItems, handleAddCartItem, isCartAdded}}>{children}</CartItems.Provider>
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
