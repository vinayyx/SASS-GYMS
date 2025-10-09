import React from 'react'
import Header from '../Utils/Header'
import Hero from '../Components/Canteen/Hero'
import Navbar from '../Utils/Navbar'
import Footer from '../Utils/Footer'

function Canteen() {
  return (
    <div>
        <Navbar/>
        <Header title={"Canteen"} />
        <Hero/>
        <Footer/>

      
    </div>
  )
}

export default Canteen
