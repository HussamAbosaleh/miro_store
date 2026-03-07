import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "../components/Hero";
import { CartContext } from "../context/CartContext";

function Home() {

const [featured, setFeatured] = useState([]);
const [men, setMen] = useState([]);
const [women, setWomen] = useState([]);

const { addToCart } = useContext(CartContext);

useEffect(() => {

fetch("http://localhost:5000/api/products")
.then(res => res.json())
.then(data => {

const products = data.products;

setFeatured(products.slice(0,4));
setMen(products.filter(p => p.gender === "men").slice(0,4));
setWomen(products.filter(p => p.gender === "women").slice(0,4));

});

}, []);

const renderProducts = (list) => (

<div className="grid">

{list.map(product => (

<div key={product._id} className="card">

<Link to={`/product/${product._id}`}>

<div className="image-box">

<img
src={`http://localhost:5000${product.images?.[0]}`}
alt={product.name}
/>

<button
className="add-cart"
onClick={(e)=>{
e.preventDefault();
addToCart(product);
}}
>
Add to Cart
</button>

</div>

<div className="card-info">

<h4>{product.name}</h4>
<span>{product.price} €</span>

</div>

</Link>

</div>

))}

</div>

);

return (

<>

<Hero />

<div className="home-wrapper">

<section className="section">

<h2>Featured</h2>
{renderProducts(featured)}

</section>

<section className="section">

<h2>Men</h2>
{renderProducts(men)}

</section>

<section className="section">

<h2>Women</h2>
{renderProducts(women)}

</section>

</div>

</>

);

}

export default Home;