import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Blogs from "./Pages/Blogs";
import Plans from "./Pages/Plans";
import Onboarding from "./Pages/Onboarding";
import "leaflet/dist/leaflet.css";
import RenewPlan from "./Pages/RenewPlan";
import MarkAttendance from "./Pages/MarkAttendance";
import Canteen from "./Pages/Canteen";
import Cart from "./Pages/Cart";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="about-us/" element={<About />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/plan" element={<Plans />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/renewplan" element={<RenewPlan />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
         <Route path="/canteen" element={<Canteen />} />
         <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
