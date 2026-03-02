import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./pages/Cart";
import OrderScreen from "./pages/OrderScreen";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />

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
      </Routes>
    </>
  );
}

export default App;