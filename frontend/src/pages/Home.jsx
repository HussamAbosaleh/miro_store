import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Hero from "../components/Hero";

function Home(){

const [featured,setFeatured] = useState([]);
const [hoodies,setHoodies] = useState([]);
const [sweats,setSweats] = useState([]);

const [loading,setLoading] = useState(true);
const [error,setError] = useState(null);

/* ================= LOAD PRODUCTS ================= */

useEffect(()=>{

const fetchProducts = async()=>{

try{

const res = await fetch("http://https://miro-store-1.onrender.com/api/products");

if(!res.ok){
throw new Error("Failed to load products");
}

const data = await res.json();

let products = data.products || [];

/* newest first */

products = products.sort(
(a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
);

/* FEATURED */

setFeatured(products.slice(0,4));

/* HOODIES */

setHoodies(
products
.filter(p => p.category === "hoodies")
.slice(0,4)
);

/* SWEATSHIRTS */

setSweats(
products
.filter(p => p.category === "sweatshirts")
.slice(0,4)
);

}catch(err){

console.error(err);
setError("Failed to load products");

}finally{

setLoading(false);

}

};

fetchProducts();

},[]);


/* ================= PRODUCT CARD ================= */

const renderProducts = (list)=>{

return(

<div className="grid">

{list.map(product=>{

const image =
product.images && product.images.length > 0
? `http://https://miro-store-1.onrender.com${product.images[0]}`
: "https://via.placeholder.com/400x500";

const image2 =
product.images && product.images.length > 1
? `http://https://miro-store-1.onrender.com${product.images[1]}`
: image;

return(

<div key={product._id} className="card">

<div className="image-box">

{/* badge */}

<div className="product-badge">
New
</div>

<Link to={`/product/${product._id}`}>

<img
src={image}
alt={product.name}
className="product-img main-img"
/>

<img
src={image2}
alt={product.name}
className="product-img hover-img"
/>

</Link>

</div>

<Link to={`/product/${product._id}`} className="card-info">

<h4>{product.name}</h4>

<span>{product.price} €</span>

</Link>

</div>

)

})}

</div>

)

};


/* ================= UI ================= */

if(loading){
return <p style={{padding:"120px"}}>Loading...</p>
}

if(error){
return <p style={{padding:"120px"}}>{error}</p>
}

return(

<>

<Hero />

<div className="home-wrapper">



{/* ================= COLLECTIONS ================= */}

<section className="collections">

<Link to="/products?gender=men" className="collection-card men">

<div className="collection-overlay">
<h2>Men Collection</h2>
<p>Streetwear essentials for everyday style</p>
<span className="shop-btn">Shop Now</span>
</div>

</Link>


<Link to="/products?gender=women" className="collection-card women">

<div className="collection-overlay">
<h2>Women Collection</h2>
<p>Comfortable and modern designs</p>
<span className="shop-btn">Shop Now</span>
</div>

</Link>

</section>


{/* ================= FEATURED ================= */}

<section className="section">

<div className="section-header">

<h2>Featured Products</h2>

<Link to="/men" className="view-all">
View All
</Link>

</div>

{renderProducts(featured)}

</section>

{/* ================= TRUST SECTION ================= */}

<section className="trust-section">

<div className="trust-item">
<div className="trust-icon">🚚</div>
<div>
<h4>Free Shipping</h4>
<p>Orders over €99</p>
</div>
</div>

<div className="trust-item">
<div className="trust-icon">⭐</div>
<div>
<h4>Thank You</h4>
<p>Engineer Ahmed Shaashaa</p>
</div>
</div>

<div className="trust-item">
<div className="trust-icon">🔒</div>
<div>
<h4>Secure Payment</h4>
<p>Safe checkout</p>
</div>
</div>

<div className="trust-item">
<div className="trust-icon">⭐</div>
<div>
<h4>Premium Quality</h4>
<p>High quality fabrics</p>
</div>
</div>

</section>


{/* ================= HOODIES ================= */}

<section className="section">

<div className="section-header">

<h2>Hoodies</h2>

<Link to="/men" className="view-all">
View All
</Link>

</div>

{renderProducts(hoodies)}

</section>


{/* ================= SWEATSHIRTS ================= */}

<section className="section">

<div className="section-header">

<h2>Sweatshirts</h2>

<Link to="/men" className="view-all">
View All
</Link>

</div>

{renderProducts(sweats)}

</section>


{/* ================= PROMO BANNER ================= */}

<section className="promo-banner">

<h2>Free Shipping on Orders Over €99</h2>

<p>Premium streetwear designed for everyday comfort.</p>

<Link to="/men" className="banner-btn">
Shop Now
</Link>

</section>

</div>

</>

)

}

export default Home;