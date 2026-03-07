import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar(){

const [scrolled,setScrolled] = useState(false);

const { cartItems } = useContext(CartContext);
const { user, logout } = useContext(AuthContext);

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

<Link to="/cart" className="cart">

🛒

{cartItems.length > 0 && (
<span className="cart-badge">
{cartItems.length}
</span>
)}

</Link>

{user ? (

<button className="login logout-btn" onClick={logout}>
Logout
</button>

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