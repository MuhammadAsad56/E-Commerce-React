import React from 'react'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import './App.css'
// import HomePage from './pages/home/Home'
// import AppRouter from "./config/Router"
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<Products/>}/>
       <Route path='/products'>
         <Route index element={<Products/>}/>
         <Route path=':id' element={<ProductDetail/>}/>
       </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
