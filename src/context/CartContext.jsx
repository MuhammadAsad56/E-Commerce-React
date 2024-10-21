import React ,{ createContext, useEffect, useState } from "react";

export const CartContext = createContext()
export function CartContextProvider({children}){
    const [updatedProducts, setUpdatedProducts] = useState([])

    useEffect(()=>{
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(res =>{ 
            setUpdatedProducts(res.products)
            localStorage.setItem('products', JSON.stringify(res.products));
        })
    },[])

    return(
        <CartContext.Provider value={{updatedProducts, setUpdatedProducts}}>{children}</CartContext.Provider>
    )
}