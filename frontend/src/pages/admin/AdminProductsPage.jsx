import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function AdminProductsPage(){

const { token } = useContext(AuthContext)

const [products,setProducts] = useState([])
const [filteredProducts,setFilteredProducts] = useState([])
const [search,setSearch] = useState("")
const [loading,setLoading] = useState(true)

/* ================= LOAD PRODUCTS ================= */

const fetchProducts = async () => {

try{

const res = await fetch("https://miro-store-1.onrender.com/api/products")

if(!res.ok){
throw new Error("Failed to fetch products")
}

const data = await res.json()

const list = data.products || data || []

setProducts(list)
setFilteredProducts(list)

}catch(err){

console.error("Failed to load products:",err)

}finally{

setLoading(false)

}

}

/* ================= DELETE PRODUCT ================= */

const deleteProduct = async(id)=>{

if(!window.confirm("Delete this product?")) return

try{

const res = await fetch(`https://miro-store-1.onrender.com/api/products/${id}`,{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
})

if(!res.ok){
throw new Error("Delete failed")
}

fetchProducts()

}catch(err){

console.error("Delete failed:",err)

}

}

/* ================= SEARCH ================= */

const handleSearch = (value) => {

setSearch(value)

const filtered = products.filter(product =>
(product.name || "")
.toLowerCase()
.includes(value.toLowerCase())
)

setFilteredProducts(filtered)

}

/* ================= EFFECT ================= */

useEffect(()=>{
fetchProducts()
},[])

/* ================= LOADING ================= */

if(loading){
return <p style={{padding:"120px"}}>Loading...</p>
}

/* ================= RENDER ================= */

return(

<div className="admin-page">

<h1>Admin Products</h1>

<div className="admin-topbar">

<input
className="admin-search"
placeholder="Search product..."
value={search}
onChange={(e)=>handleSearch(e.target.value)}
/>

<Link to="/admin/products/add">

<button className="admin-add-btn">
+ Add Product
</button>

</Link>

</div>

<table className="admin-table">

<thead>

<tr>

<th>Image</th>
<th>Name</th>
<th>Price</th>
<th>Stock</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{filteredProducts.map(product=>{

const image =
product.images && product.images.length > 0
? `https://miro-store-1.onrender.com${product.images[0]}`
: "https://via.placeholder.com/60"

/* ================= CALCULATE STOCK ================= */

const stock =
product.sizes && product.sizes.length > 0
? product.sizes.reduce((total,s)=> total + (s.stock || 0),0)
: product.countInStock ?? product.stock ?? 0

return(

<tr key={product._id || product.id}>

<td>

<img
src={image}
alt={product.name}
style={{width:"60px",borderRadius:"6px"}}
/>

</td>

<td>{product.name}</td>

<td>{product.price} €</td>

<td>{stock}</td>

<td className="admin-actions-buttons">

<Link to={`/admin/products/edit/${product._id}`}>

<button className="admin-btn role">
Edit
</button>

</Link>

<button
className="admin-btn delete"
onClick={()=>deleteProduct(product._id)}
>

Delete

</button>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

)

}

export default AdminProductsPage