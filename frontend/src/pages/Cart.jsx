import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

const { user } = useContext(AuthContext);
const navigate = useNavigate();

const [cart, setCart] = useState(null);
const [loading, setLoading] = useState(true);
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [error, setError] = useState(null);

// ================= FETCH CART =================

const fetchCart = async () => {

try {

const res = await fetch("http://localhost:5000/api/cart/my", {
headers: {
Authorization: `Bearer ${user.token}`,
},
});

const data = await res.json();
setCart(data);

} catch {
setError("Failed to fetch cart");
} finally {
setLoading(false);
}

};

useEffect(() => {

if (!user) {
navigate("/login");
return;
}

fetchCart();

}, [user, navigate]);

// ================= UPDATE QUANTITY =================

const updateQuantity = async (productId, size, quantity) => {

if (quantity < 1) return;

try {

const res = await fetch("http://localhost:5000/api/cart/update", {
method: "PUT",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${user.token}`,
},
body: JSON.stringify({ productId, size, quantity }),
});

const data = await res.json();

if (res.ok) {
setCart(data);
} else {
setError(data.message);
}

} catch {
setError("Failed to update cart");
}

};

// ================= REMOVE ITEM =================

const removeItem = async (productId, size) => {

try {

const res = await fetch("http://localhost:5000/api/cart/remove", {
method: "DELETE",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${user.token}`,
},
body: JSON.stringify({ productId, size }),
});

const data = await res.json();

if (res.ok) {
setCart(data);
} else {
setError(data.message);
}

} catch {
setError("Failed to remove item");
}

};

// ================= CHECKOUT =================

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

setCart({ ...cart, items: [] });

navigate(`/order/${data._id}`);

} catch {

setError("Checkout failed");

} finally {

setCheckoutLoading(false);

}

};

// ================= UI =================

if (loading) return <p>Loading...</p>;

if (!cart || cart.items.length === 0) {
return (
<div className="cart-page">
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

<div className="cart-page">

<h2 className="cart-title">My Cart</h2>

{error && <p className="cart-error">{error}</p>}

<div className="cart-items">

{cart.items.map((item) => (

<div className="cart-item" key={item.product + item.size}>

<img
className="cart-image"
src={`http://localhost:5000${item.image}`}
alt={item.name}
/>

<div className="cart-info">

<h4>{item.name}</h4>

<p>Size: {item.size}</p>
<p>{item.price} €</p>

<div className="cart-qty">

<button
onClick={() =>
updateQuantity(
item.product,
item.size,
item.quantity - 1
)
}
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={() =>
updateQuantity(
item.product,
item.size,
item.quantity + 1
)
}
>
+
</button>

</div>

<button
className="remove-btn"
onClick={() =>
removeItem(item.product, item.size)
}
>
Remove
</button>

</div>

<div className="cart-subtotal">
{item.price * item.quantity} €
</div>

</div>

))}

</div>

<div className="cart-summary">

<h3>Total: {total} €</h3>

<button
className="checkout-btn"
onClick={checkoutHandler}
disabled={checkoutLoading}
>

{checkoutLoading ? "Processing..." : "Checkout"}

</button>

</div>

</div>

);

}

export default Cart;