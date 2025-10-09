import React from "react";
import Navbar from "../Utils/Navbar";
import Header from "../Utils/Header";
import Heading from "../Heading";
import Hero from "../Components/AboutUs/Hero";
import Footer from "../Utils/Footer";

function About() {
  return (
    <div>
      <Navbar />
      <Header title={"About us"} />
      <Hero/>
      <Footer/>
    </div>
  );
}

export default About;
