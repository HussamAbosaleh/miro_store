import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {

const { user, token } = useContext(AuthContext);
const navigate = useNavigate();

const [cart, setCart] = useState(null);
const [loading, setLoading] = useState(true);
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [error, setError] = useState(null);


/* ================= FETCH CART ================= */

const fetchCart = useCallback(async () => {

const authToken = token || localStorage.getItem("token");

if (!authToken) {
setLoading(false);
navigate("/login");
return;
}

try {

const res = await fetch("http://https://miro-store-1.onrender.com/api/cart/my", {
headers: {
Authorization: `Bearer ${authToken}`,
},
});

const data = await res.json();

if (!res.ok) {
setError(data.message || "Failed to fetch cart");
return;
}

setCart({
...data,
items: data.items || []
});

} catch (err) {

console.error(err);
setError("Failed to fetch cart");

} finally {

setLoading(false);

}

}, [token, navigate]);


useEffect(() => {
fetchCart();
}, [fetchCart]);



/* ================= UPDATE QUANTITY ================= */

const updateQuantity = async (productId, size, quantity) => {

if (quantity < 1) return;

const authToken = token || localStorage.getItem("token");

try {

const res = await fetch("http://https://miro-store-1.onrender.com/api/cart/update", {
method: "PUT",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${authToken}`,
},
body: JSON.stringify({ productId, size, quantity }),
});

if (res.ok) {
fetchCart();
} else {
const data = await res.json();
setError(data.message);
}

} catch {
setError("Failed to update cart");
}

};



/* ================= REMOVE ITEM ================= */

const removeItem = async (productId, size) => {

const authToken = token || localStorage.getItem("token");

try {

const res = await fetch("http://https://miro-store-1.onrender.com/api/cart/remove", {
method: "DELETE",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${authToken}`,
},
body: JSON.stringify({ productId, size }),
});

if (res.ok) {
fetchCart();
} else {
const data = await res.json();
setError(data.message);
}

} catch {
setError("Failed to remove item");
}

};



/* ================= CHECKOUT ================= */

const checkoutHandler = async () => {

if (checkoutLoading) return;

if (!cart?.items?.length) {
setError("Cart is empty");
return;
}

const authToken = token || localStorage.getItem("token");

try {

setCheckoutLoading(true);
setError(null);

const res = await fetch("http://https://miro-store-1.onrender.com/api/orders", {

method: "POST",

headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${authToken}`,
},

body: JSON.stringify({
items: cart.items.map(item => ({
product: item.product?._id || item.product,
size: item.size,
quantity: item.quantity
}))
})

});

const data = await res.json();

if (!res.ok) {
setError(data.message || "Checkout failed");
return;
}

await fetchCart();

navigate(`/order/${data._id}`);

} catch (err) {

console.error(err);
setError("Checkout failed");

} finally {

setCheckoutLoading(false);

}

};



/* ================= UI ================= */

if (loading) return <p style={{padding:"120px"}}>Loading...</p>;

if (!cart || !cart.items || cart.items.length === 0) {
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

{cart.items.map((item) => {

const productId = item.product?._id || item.product;

return (

<div className="cart-item" key={productId + item.size}>

<img
className="cart-image"
src={`http://https://miro-store-1.onrender.com${item.image}`}
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
productId,
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
productId,
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
removeItem(productId, item.size)
}
>
Remove
</button>

</div>

<div className="cart-subtotal">
{item.price * item.quantity} €
</div>

</div>

);

})}

</div>

<div className="cart-summary">

<h3>Total: {total.toFixed(2)} €</h3>

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