// import { createContext, useState } from "react";

import React, { createContext, useState } from 'react'

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
    return(
        <CartItems.Provider value={{cartItems, setCartItems}}>{children}</CartItems.Provider>
    )
}

export const CardAdded = createContext()

 export function CardAddedProvider({children}){
    const [isCardAdded, setIsCardAdded] = useState(false)
    return(
        <CardAdded.Provider value={{isCardAdded, setIsCardAdded}}>{children}</CardAdded.Provider>
    )
}
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
