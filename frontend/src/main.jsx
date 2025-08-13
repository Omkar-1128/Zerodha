import { createRoot } from "react-dom/client";
import HomePage from "./landing_page/Home/HomePage";
import Signup from "./landing_page/Signup/SignupPage";
import About from "./landing_page/About/Aboutpage";
import Products from "./landing_page/Products/ProductsPage";
import Pricing from "./landing_page/Pricing/PricingPage";
import Support from "./landing_page/Support/SupportPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import PageNotFound from "./landing_page/PageNotFound";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/Signup" element={<Signup />}></Route>
      <Route path="/About" element={<About />}></Route>
      <Route path="/Products" element={<Products />}></Route>
      <Route path="/Pricing" element={<Pricing />}></Route>
      <Route path="/Support" element={<Support />}></Route>
      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);
