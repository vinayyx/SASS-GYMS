import React from 'react'
import Navbar from '../Utils/Navbar'
import Hero from '../Components/Home/Hero'
import Hero2 from '../Components/Home/Hero2'
import AboutUs from '../Components/Home/AboutUs'
import Team from '../Components/Home/Team'
import BMICalculator from '../Components/Home/BMICalculator'
import Testimonial from '../Utils/Testimonial'
import Footer from '../Utils/Footer'
import NewsLater from '../Utils/NewsLater'
import WorkoutSchedule from '../Components/Home/WorkoutSchedule'
import Achievements from '../Components/Home/Achievements'

function Home() {
  return (
    <div>
     <Navbar/>
     <Hero/>
     <AboutUs/>
     <Achievements/>
     <BMICalculator/>
     <WorkoutSchedule/>
     <Footer/>
    </div>
  )
}

export default Home
