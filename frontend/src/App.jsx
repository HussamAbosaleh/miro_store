import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";

function App() {

const location = useLocation();

const hideNavbar =
location.pathname.startsWith("/product");

return (

<>

{!hideNavbar && <Navbar />}

<Routes>

<Route path="/" element={<Home />} />

<Route path="/product/:id" element={<ProductDetails />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/forgot" element={<ForgotPassword />} />

</Routes>

{!hideNavbar && <Footer />}

</>

);

}

export default App;