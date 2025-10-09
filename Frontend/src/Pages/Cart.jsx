import React from 'react'
import Header from '../Utils/Header'
import Hero from '../Components/Cart/Hero'
import Navbar from '../Utils/Navbar'
import Footer from '../Utils/Footer'

function Cart() {
  return (
    <div>
        <Navbar/>
        <Header title={"Cart"} />
        <Hero/>
        <Footer/>
      
    </div>
  )
}

export default Cart
