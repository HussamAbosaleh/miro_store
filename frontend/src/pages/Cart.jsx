import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cart/my", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        setCart(data);
      } catch (err) {
        setError("Failed to fetch cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  const checkoutHandler = async () => {
    if (checkoutLoading) return;

    try {
      setCheckoutLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Checkout failed");
        return;
      }

      // بعد النجاح نفرغ الكارت من الواجهة
      setCart({ ...cart, items: [] });

      navigate(`/order/${data._id}`);
    } catch (err) {
      setError("Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!cart || cart.items.length === 0) {
    return (
      <div>
        <h2>My Cart</h2>
        <p>Cart is empty</p>
      </div>
    );
  }

  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>My Cart</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {cart.items.map((item) => (
        <div key={item.product + item.size}>
          <h4>{item.name}</h4>
          <img
            src={`http://localhost:5000${item.image}`}
            width="120"
            alt={item.name}
          />
          <p>Size: {item.size}</p>
          <p>Price: {item.price} €</p>
          <p>Quantity: {item.quantity}</p>
          <p>Subtotal: {item.price * item.quantity} €</p>
          <hr />
        </div>
      ))}

      <h3>Total: {total} €</h3>

      <button onClick={checkoutHandler} disabled={checkoutLoading}>
        {checkoutLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}

export default Cart;