import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import OrderScreen from "./pages/OrderScreen";
import Profile from "./pages/Profile";
import "./App.css";

function App() {

return (

<>

<Navbar />

<Routes>

{/* ================= PUBLIC ROUTES ================= */}

<Route path="/" element={<Home />} />

<Route path="/product/:id" element={<ProductDetails />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/men" element={<Home />} />

<Route path="/women" element={<Home />} />


{/* ================= PROTECTED ROUTES ================= */}

<Route
path="/cart"
element={
<PrivateRoute>
<Cart />
</PrivateRoute>
}
/>

<Route
path="/order/:id"
element={
<PrivateRoute>
<OrderScreen />
</PrivateRoute>
}
/>

<Route
path="/profile"
element={
<PrivateRoute>
<Profile />
</PrivateRoute>
}
/>


{/* ================= 404 ================= */}

<Route path="*" element={<h2 style={{padding:"120px"}}>Page Not Found</h2>} />

</Routes>

<Footer />

</>

);

}

export default App;