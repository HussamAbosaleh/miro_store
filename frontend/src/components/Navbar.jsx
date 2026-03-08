import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar(){

const [scrolled,setScrolled] = useState(false);
const [cartCount,setCartCount] = useState(0);

const { user, logout } = useContext(AuthContext);


/* ================= SCROLL EFFECT ================= */

useEffect(()=>{

const handleScroll = () => {

if(window.scrollY > 50){
setScrolled(true);
}else{
setScrolled(false);
}

};

window.addEventListener("scroll",handleScroll);

return () => window.removeEventListener("scroll",handleScroll);

},[]);



/* ================= LOAD CART COUNT ================= */

useEffect(()=>{

const fetchCart = async () => {

try{

const token = localStorage.getItem("token");

if(!token){
setCartCount(0);
return;
}

const res = await fetch("http://localhost:5000/api/cart/my",{
headers:{
Authorization:`Bearer ${token}`
}
});

if(!res.ok){
setCartCount(0);
return;
}

const data = await res.json();

const count = (data.items || []).reduce(
(acc,item)=> acc + item.quantity,
0
);

setCartCount(count);

}catch(err){

console.log("Cart load error",err);
setCartCount(0);

}

};

fetchCart();

},[user]);



return(

<header className={scrolled ? "navbar scrolled" : "navbar"}>

<div className="nav-container">

<Link to="/" className="logo">
<img src={logo} alt="Miro"/>
</Link>

<nav className="nav-links">

<Link to="/">Home</Link>
<Link to="/men">Men</Link>
<Link to="/women">Women</Link>

</nav>

<div className="nav-right">


{/* CART */}

<Link to="/cart" className="cart">

🛒

{cartCount > 0 && (
<span className="cart-badge">
{cartCount}
</span>
)}

</Link>


{/* USER MENU */}

{user ? (

<>

<Link to="/profile" className="login">
Profile
</Link>

<button
className="login logout-btn"
onClick={()=>{
logout();
setCartCount(0);
window.location.href="/";
}}
>
Logout
</button>

</>

) : (

<Link to="/login" className="login">
Login
</Link>

)}

</div>

</div>

</header>

)

}

export default Navbar;