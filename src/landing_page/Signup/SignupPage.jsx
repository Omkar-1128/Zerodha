import React from "react";
import Hero from "./Hero";
import Investment from "./Investment";
import Benefits from "./Benefits";
import Explore from "./Explore";
import Openaccount from "../Openaccount";

function SignupPage() {
  return (
    <div>
      <Hero />
      <Investment />
      <Benefits />
      <Explore />
      <Openaccount
        heading={"Open a Zerodha account"}
        description={
          "Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades."
        }
      />
    </div>
  );
}

export default SignupPage;
