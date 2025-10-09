import React from "react";
import Navbar from "../Utils/Navbar";
import Header from "../Utils/Header";
import Heading from '../Heading'
import Hero from "../Components/Contact/Hero";
import Map from "../Components/Contact/Map";
import Footer from "../Utils/Footer";


function Contact() {
  return (
    <div>
      <Navbar />
      <Header title={"Contact"} />
      <Hero/>
      <Map/>
      <Footer/>
    </div>
  );
}

export default Contact;
