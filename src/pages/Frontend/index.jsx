import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/home'
import Product from './Product/product'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Frontend = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Product />} />
      </Routes>
      <Footer />
    </>
  )
}

export default Frontend