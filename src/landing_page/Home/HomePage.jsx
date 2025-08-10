import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import Openaccount from "../Openaccount";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import Footer from "../Footer";
import Awards from "./Awards";
import "./Home.css";

function HomePage() {
  return (
    <>
      {/* <Navbar />  */}
      <Hero />
      <Stats />
      <Awards />
      <Pricing />
      <Education />
      <Openaccount
        heading={"Open a Zerodha account"}
        description={
          "Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades."
        }
      />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
