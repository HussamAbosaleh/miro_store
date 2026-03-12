import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Cart from "./pages/Cart";
import OrderScreen from "./pages/OrderScreen";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

/* LEGAL */
import LegalNotice from "./pages/legal/LegalNotice";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import ShippingPolicy from "./pages/legal/ShippingPolicy";
import TermsOfService from "./pages/legal/TermsofService";

import "./App.css";

function App() {

return (

<div className="app-container">

<Navbar />

<main className="main-content">

<Routes>

{/* PUBLIC */}

<Route path="/" element={<Home />} />
<Route path="/product/:id" element={<ProductDetails />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/men" element={<Home />} />
<Route path="/women" element={<Home />} />

<Route path="/search" element={<Search />} />

{/* LEGAL */}

<Route path="/legal" element={<LegalNotice />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/refund" element={<RefundPolicy />} />
<Route path="/shipping" element={<ShippingPolicy />} />
<Route path="/terms" element={<TermsOfService />} />

{/* ADMIN */}

<Route
path="/admin"
element={
<AdminRoute>
<AdminDashboard />
</AdminRoute>
}
/>

<Route
path="/admin/products"
element={
<AdminRoute>
<AdminProductsPage />
</AdminRoute>
}
/>

<Route
path="/admin/products/add"
element={
<AdminRoute>
<AddProduct />
</AdminRoute>
}
/>

<Route
path="/admin/products/edit/:id"
element={
<AdminRoute>
<EditProduct />
</AdminRoute>
}
/>

{/* USER PROTECTED */}

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

{/* 404 */}

<Route
path="*"
element={<h2 style={{ padding: "120px" }}>Page Not Found</h2>}
/>

</Routes>

</main>

<Footer />

</div>

);

}

export default App;