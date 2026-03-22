import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ProductsPage.css";

function ProductsPage(){

const [searchParams] = useSearchParams();
const gender = searchParams.get("gender");

const [products,setProducts] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

let url = "https://miro-store-1.onrender.com/api/products";

if(gender){
url += `?gender=${gender}`;
}

fetch(url)
.then(res=>res.json())
.then(data=>{
setProducts(data.products || []);
setLoading(false);
})
.catch(err=>{
console.error(err);
setLoading(false);
});

},[gender]);

if(loading){
return <p style={{padding:"120px"}}>Loading...</p>
}

return(

<div className="products-page">

<h1>
{gender ? `${gender} collection` : "All Products"}
</h1>

<div className="products-grid">

{products.map(product=>{

const image =
product.images && product.images.length > 0
? `https://miro-store-1.onrender.com${product.images[0]}`
: "https://via.placeholder.com/400x500";

const rating =
product.rating !== undefined
? product.rating.toFixed(1)
: "0.0";

return(

<div key={product._id} className="product-card">

<Link to={`/product/${product._id}`}>

<img src={image} alt={product.name}/>

<h4>{product.name}</h4>

<p>{product.price} €</p>

<p className="rating">
⭐ {rating} / 5
</p>

<p className="reviews">
{product.numReviews || 0} reviews
</p>

</Link>

</div>

)

})}

</div>

</div>

)

}

export default ProductsPage;