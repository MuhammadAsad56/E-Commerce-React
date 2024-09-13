import React from 'react'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { AuthContextProvider, CardAddedProvider, CartItemsProvider } from './context/AuthContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import CartItemSec from './pages/CartItemSec'

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setUserAuthenticated({email: user.email, photo: user.photoURL})
      }else{
        setUserAuthenticated(false)
      }
    })
  } , [])
  
  return (
    <>
    <AuthContextProvider>
      <CartItemsProvider>
        <CardAddedProvider>
    <BrowserRouter>
    <Header userAuthenticated={userAuthenticated}/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/products'>
         <Route userAuthenticated={userAuthenticated} index element={<Products/>}/>
         <Route path=':id' element={<ProductDetail/>}/>
       </Route>
       <Route path='/cartitems' element={<CartItemSec/>}/>
    </Routes>
    </BrowserRouter>
        </CardAddedProvider>
      </CartItemsProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
