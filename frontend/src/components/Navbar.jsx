import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar(){

const [scrolled,setScrolled] = useState(false);
const [cartCount,setCartCount] = useState(0);
const [search,setSearch] = useState("");
const [menuOpen,setMenuOpen] = useState(false);

const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

/* ================= SCROLL EFFECT ================= */

useEffect(()=>{

const handleScroll = () => {

if(window.scrollY > 40){
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

const res = await fetch("http://https://miro-store-1.onrender.com/api/cart/my",{
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


/* ================= SEARCH ================= */

const handleSearch = (e)=>{

e.preventDefault();

if(!search.trim()) return;

navigate(`/search?q=${search}`);

setSearch("");

};


/* ================= UI ================= */

return(

<header className={scrolled ? "navbar scrolled" : "navbar"}>

<div className="nav-container">

{/* LEFT */}

<div className="nav-left">

<button
className="hamburger"
onClick={()=>setMenuOpen(!menuOpen)}
>
☰
</button>

<Link to="/" className="logo">
<img src={logo} alt="Miro"/>
</Link>

</div>


{/* CENTER NAV */}

<nav className={`nav-links ${menuOpen ? "open" : ""}`}>

<Link to="/" onClick={()=>setMenuOpen(false)}>
Home
</Link>

<Link to="/products?gender=men" onClick={()=>setMenuOpen(false)}>
Men
</Link>

<Link to="/products?gender=women" onClick={()=>setMenuOpen(false)}>
Women
</Link>

</nav>


{/* SEARCH */}

<form className="nav-search" onSubmit={handleSearch}>

<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</form>


{/* RIGHT */}

<div className="nav-right">

{user?.isAdmin && (
<Link to="/admin" className="nav-btn">
Admin
</Link>
)}

<Link to="/cart" className="cart">

🛒

{cartCount > 0 && (
<span className="cart-badge">
{cartCount}
</span>
)}

</Link>


{user ? (

<>

<Link to="/profile" className="nav-btn">
Profile
</Link>

<button
className="nav-btn"
onClick={()=>{
logout();
setCartCount(0);
navigate("/");
}}
>
Logout
</button>

</>

) : (

<Link to="/login" className="nav-btn">
Login
</Link>

)}

</div>

</div>

</header>

)

}

export default Navbar;