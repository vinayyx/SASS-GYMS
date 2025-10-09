import React from "react";
import Navbar from "../Utils/Navbar";
import Header from "../Utils/Header";
import Heading from "../Heading";
import Hero from "../Components/Blogs/Hero";
import Footer from "../Utils/Footer";

function Blogs() {
  return (
    <div>
      <Navbar />
      <Header title={"Blogs"} />
      <Hero/>
      <Footer />
    </div>
  );
}

export default Blogs;
