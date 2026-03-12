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

const res = await fetch("http://localhost:5000/api/products")

if(!res.ok){
throw new Error("Failed to fetch products")
}

const data = await res.json()

const list = data.products || data

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

const res = await fetch(`http://localhost:5000/api/products/${id}`,{
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
(product.name || "").toLowerCase().includes(value.toLowerCase())
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

<div style={{padding:"40px"}}>

<h1>Admin Products</h1>

{/* ================= TOP BAR ================= */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginTop:"20px",
marginBottom:"20px"
}}>

<input
placeholder="Search product..."
value={search}
onChange={(e)=>handleSearch(e.target.value)}
style={{
padding:"8px",
width:"250px"
}}
/>

<Link to="/admin/products/add">

<button style={{
padding:"10px 18px",
cursor:"pointer",
background:"#111",
color:"#fff",
border:"none"
}}>

+ Add Product

</button>

</Link>

</div>

{/* ================= PRODUCTS TABLE ================= */}

<table style={{
width:"100%",
borderCollapse:"collapse"
}}>

<thead style={{background:"#f5f5f5"}}>

<tr>

<th style={{padding:"10px"}}>Image</th>
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
? `http://localhost:5000${product.images[0]}`
: "https://via.placeholder.com/60"

return(

<tr key={product._id} style={{borderBottom:"1px solid #eee"}}>

<td style={{padding:"10px"}}>

<img
src={image}
alt={product.name}
style={{
width:"60px",
height:"60px",
objectFit:"cover"
}}
/>

</td>

<td>{product.name}</td>

<td>{product.price} €</td>

<td>{product.countInStock || 0}</td>

<td>

<Link to={`/admin/products/edit/${product._id}`}>

<button style={{marginRight:"10px"}}>
Edit
</button>

</Link>

<button
onClick={()=>deleteProduct(product._id)}
style={{color:"red"}}
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