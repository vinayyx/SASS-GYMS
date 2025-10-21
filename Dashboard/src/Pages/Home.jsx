import React from 'react'
import Hero from '../Components/Home/Hero'
import Features from '../Components/Home/Features'
import Pricing from '../Components/Home/Pricing'
import Footer from '../Components/Home/Footer'
import HowToUseFAQ from '../Components/Home/HowToUseFAQ'
import ContactUs from '../Components/Home/ContactUs'
import HomeNavbar from '../Components/HomeNavbar'
import ContactSection from '../Components/ContactSection'

function Home() {
  return (
    <div className='overflow-hidden'> 
        <HomeNavbar/>
        <Hero/>
        <Features/>
        <Pricing/>
        <ContactSection/>
        <Footer/>

      
    </div>
  )
}

export default Home
