import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile(){

const { user, token } = useContext(AuthContext);

const [orders,setOrders] = useState([]);
const [loading,setLoading] = useState(true);
const [error,setError] = useState("");

useEffect(()=>{

const fetchOrders = async () => {

try{

const res = await fetch(
"https://miro-store-1.onrender.com/api/orders/my-orders",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data = await res.json();

if(res.ok){
setOrders(data);
}else{
setError(data.message);
}

}catch{
setError("Failed to fetch orders");
}

setLoading(false);

};

fetchOrders();

},[user]);

return(

<div className="profile-page">

<h1>My Account</h1>

<div className="profile-grid">

{/* PROFILE INFO */}

<div className="profile-card">

<h3>Profile Info</h3>

<p><strong>Name:</strong> {user?.name}</p>
<p><strong>Email:</strong> {user?.email}</p>

</div>

{/* ORDERS */}

<div className="profile-card">

<h3>My Orders</h3>

{loading && <p>Loading orders...</p>}

{error && <p>{error}</p>}

{!loading && orders.length === 0 && (
<p>You have no orders yet.</p>
)}

{orders.map(order => (

<div key={order._id} className="order-item">

<p>
Order ID: {order._id.slice(-6)}
</p>

<p>
Total: {order.totalPrice} €
</p>

<p>
Status: {order.isPaid ? "Paid" : "Pending"}
</p>

<Link to={`/order/${order._id}`}>
View Order
</Link>

</div>

))}

</div>

{/* SECURITY */}

<div className="profile-card">

<h3>Security</h3>

<button>Change Password</button>

</div>

</div>

</div>

)

}

export default Profile;