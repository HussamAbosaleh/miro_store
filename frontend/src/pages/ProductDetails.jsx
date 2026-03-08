import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./ProductDetails.css";

function ProductDetails() {

const { id } = useParams();
const navigate = useNavigate();

const { user, token } = useContext(AuthContext);

const [product, setProduct] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);
const [size, setSize] = useState("");
const [quantity, setQuantity] = useState(1);
const [message, setMessage] = useState("");

/* ================= FETCH PRODUCT ================= */

useEffect(() => {

fetch(`http://localhost:5000/api/products/${id}`)
.then((res) => res.json())
.then((data) => {
setProduct(data);
setSelectedImage(data.images?.[0]);
})
.catch(() => setMessage("Failed to load product"));

}, [id]);

/* ================= ADD TO CART ================= */

const addToCart = async () => {

if (!user || !token) {
setMessage("Please login first");
return;
}

if (!size) {
setMessage("Select a size");
return;
}

try {

const res = await fetch("http://localhost:5000/api/cart/add", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
productId: product._id,
size,
quantity,
}),
});

const data = await res.json();

if (!res.ok) {
setMessage(data.message || "Failed to add to cart");
return;
}

setMessage("Product added to cart");

} catch (err) {

console.error(err);
setMessage("Something went wrong");

}

};

if (!product) return <p>Loading...</p>;

const selectedSizeStock =
product.sizes?.find((s) => s.size === size)?.stock;

return (

<div className="product-wrapper">

{/* TOP NAV */}

<div className="product-nav">

<button className="back-btn" onClick={() => navigate(-1)}>
← Back
</button>

<button className="home-btn" onClick={() => navigate("/")}>
Home
</button>

</div>

<div className="product-top">

{/* IMAGE */}

<div className="gallery">

<img
className="main-image"
src={`http://localhost:5000${selectedImage}`}
alt={product.name}
/>

<div className="thumbs">

{product.images?.map((img) => (

<img
key={img}
src={`http://localhost:5000${img}`}
alt=""
className={selectedImage === img ? "active-thumb" : ""}
onClick={() => setSelectedImage(img)}
/>

))}

</div>

</div>

{/* PRODUCT INFO */}

<div className="product-info">

<h1>{product.name}</h1>

<p className="price">{product.price} €</p>

<p className="short-desc">
Premium cotton clothing designed for everyday comfort.
</p>

{/* SIZE */}

<div className="sizes">

<h4>Select size</h4>

<div className="sizes-row">

{product.sizes?.map((s) => (

<button
key={s.size}
disabled={s.stock === 0}
className={size === s.size ? "active" : ""}
onClick={() => setSize(s.size)}
>
{s.size}
</button>

))}

</div>

</div>

{/* STOCK */}

{size && (
<p className="stock">
{selectedSizeStock} left in stock
</p>
)}

{/* QUANTITY */}

<div className="qty">

<button
onClick={() => setQuantity(Math.max(1, quantity - 1))}
>
-
</button>

<span>{quantity}</span>

<button
onClick={() => setQuantity(quantity + 1)}
>
+
</button>

</div>

{/* ADD TO CART */}

<button className="product-add-cart" onClick={addToCart}>
Add to Cart
</button>

{message && <p className="msg">{message}</p>}

{/* SHIPPING */}

<div className="shipping-info">

<p>🚚 Delivery: 4–7 business days (Germany & EU)</p>

<p>📦 Shipping: Germany Free · EU €9.90 (Free over €99)</p>

<p>✔ 14-day return policy (EU law)</p>

</div>

</div>

</div>

{/* DESCRIPTION */}

<div className="product-description">

<h3>Product Details</h3>

<p>
Crestay Essential Hoodie designed for everyday wear —
defined by simplicity, balance, and quiet confidence.

Crafted from premium materials (80% cotton, 20% polyester)
with a 280 g/m² fabric weight and double-stitched seams
for durability.

Soft brushed interior for comfort and a regular unisex
fit designed for everyday wearability.
</p>

</div>

</div>

);

}

export default ProductDetails;