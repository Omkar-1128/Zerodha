import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./landing_page/Home/HomePage";
import Signup from "./landing_page/Signup/SignupPage";
import About from "./landing_page/About/Aboutpage";
import Products from "./landing_page/Products/ProductsPage";
import Pricing from "./landing_page/Pricing/PricingPage";
import Support from "./landing_page/Support/SupportPage";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import PageNotFound from "./landing_page/PageNotFound";
import ScrollToTop from "./ScrollToTop";
import { RegisterForm , Home, LoginForm } from "./pages";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";

export default function AppRoutes() {
  const location = useLocation();
  const hideFooter = location.pathname === "/Login" || location.pathname === "/Register" || location.pathname === "/Home";

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}