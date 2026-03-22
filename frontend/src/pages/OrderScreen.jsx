import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./OrderScreen.css";

function OrderScreen() {

const { id } = useParams();
const { token } = useContext(AuthContext);

const [order, setOrder] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [paypalId, setPaypalId] = useState("");

/* ================= FETCH ORDER ================= */

useEffect(() => {

const fetchOrder = async () => {

if (!token) {
setError("Not logged in");
setLoading(false);
return;
}

try {

const res = await fetch(`http://https://miro-store-1.onrender.com/api/orders/${id}`, {
headers: {
Authorization: `Bearer ${token}`
}
});

const data = await res.json();

if (res.ok) {
setOrder(data);
} else {
setError(data.message || "Failed to load order");
}

} catch {
setError("Failed to load order");
}

setLoading(false);
};

fetchOrder();

}, [id, token]);



/* ================= FETCH PAYPAL CLIENT ================= */

useEffect(() => {

const getPaypalId = async () => {

try {

const res = await fetch("http://https://miro-store-1.onrender.com/api/config/paypal");
const data = await res.text();

setPaypalId(data);

} catch {
console.log("PayPal client load failed");
}

};

getPaypalId();

}, []);



/* ================= PAYPAL SUCCESS ================= */

const successPaymentHandler = async (details) => {

try {

const res = await fetch(`http://https://miro-store-1.onrender.com/api/orders/${order._id}/pay`, {

method: "PUT",

headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`
},

body: JSON.stringify(details)

});

const data = await res.json();

if (res.ok) {
setOrder(data);
} else {
setError(data.message || "Payment update failed");
}

} catch {
setError("Payment failed");
}

};



/* ================= UI ================= */

if (loading)
return <p style={{ padding: "120px" }}>Loading order...</p>;

if (error)
return <p style={{ padding: "120px" }}>{error}</p>;

if (!order)
return <p style={{ padding: "120px" }}>Order not found</p>;

return (

<div className="order-page">

<h1>Order Details</h1>

<div className="order-box">

<p><strong>Order ID:</strong> {order._id}</p>

<p>
<strong>Status:</strong>
{order.isPaid ? " Paid" : " Not Paid"}
</p>

</div>

<h2>Items</h2>

{order.orderItems.map((item, index) => (

<div className="order-box" key={index}>

<p><strong>{item.name}</strong></p>
<p>Size: {item.size}</p>
<p>Quantity: {item.quantity}</p>
<p>Price: {item.price} €</p>

</div>

))}

<div className="order-box">

<h3>Total: {order.totalPrice} €</h3>

</div>


{/* PAYPAL BUTTON */}

{!order.isPaid && paypalId && (

<div className="paypal-box">

<PayPalScriptProvider options={{ "client-id": paypalId }}>

<PayPalButtons

createOrder={(data, actions) => {

return actions.order.create({
purchase_units: [
{
amount: {
value: order.totalPrice
}
}
]
});

}}

onApprove={(data, actions) => {

return actions.order.capture().then(function (details) {
successPaymentHandler(details);
});

}}

></PayPalButtons>

</PayPalScriptProvider>

</div>

)}

</div>

);

}

export default OrderScreen;