import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ProductsPage.css";

function ProductsPage(){

const [searchParams] = useSearchParams();
const gender = searchParams.get("gender");

const [products,setProducts] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

let url = "http://localhost:5000/api/products";

if(gender){
url += `?gender=${gender}`;
}

fetch(url)
.then(res=>res.json())
.then(data=>{
setProducts(data.products || []);
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
? `http://localhost:5000${product.images[0]}`
: "https://via.placeholder.com/400x500";

return(

<div key={product._id} className="product-card">

<Link to={`/product/${product._id}`}>

<img src={image} alt={product.name}/>

<h4>{product.name}</h4>

<p>{product.price} €</p>

</Link>

</div>

)

})}

</div>

</div>

)

}

export default ProductsPage;