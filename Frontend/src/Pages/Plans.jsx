import React from "react";
import Navbar from "../Utils/Navbar";
import Header from "../Utils/Header";
import PlanCard from "../Components/Plan/PlanCard";
import Footer from "../Utils/Footer";

function Plans() {
  return (
    <div className="overflow-hidden" >
      <Navbar />
      <Header title={"Plans"} />
      <PlanCard/>
      <Footer/>
    </div>
  );
}

export default Plans;
