import { Link } from "react-router-dom";

function Header() {

return (

<header className="header">

<div className="logo">
<Link to="/">MIRO Store</Link>
</div>

<nav className="nav">

<Link to="/">Home</Link>
<Link to="/men">Men</Link>
<Link to="/women">Women</Link>


</nav>

<div className="cart">
<Link to="/cart">Cart</Link>
</div>

</header>

);

}

export default Header;