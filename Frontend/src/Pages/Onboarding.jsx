import React from 'react'
import Navbar from '../Utils/Navbar'
import Hero from '../Components/Onboarding/Hero'
import Header from '../Utils/Header'
import Footer from '../Utils/Footer'
import Heading from '../Heading'

function Onboarding() {
  return (
    <div>
      <Navbar/>
      
      <Header title={"Onboarding"} />
      <Heading title={"Where Goals Meet Action"} />
      <Hero/>
      <Footer/>
    </div>
  )
}

export default Onboarding
