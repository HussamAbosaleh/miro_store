import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

function EditProduct(){

const { id } = useParams()
const navigate = useNavigate()
const { token } = useContext(AuthContext)

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [category,setCategory] = useState("")
const [gender,setGender] = useState("men")
const [description,setDescription] = useState("")
const [image,setImage] = useState("")

const [loading,setLoading] = useState(true)
const [error,setError] = useState("")
const [saving,setSaving] = useState(false)

/* ================= LOAD PRODUCT ================= */

useEffect(()=>{

const fetchProduct = async ()=>{

try{

const res = await fetch(`http://https://miro-store-1.onrender.com/api/products/${id}`)

if(!res.ok){
throw new Error("Product not found")
}

const data = await res.json()

setName(data.name || "")
setPrice(data.price || "")
setCategory(data.category || "")
setGender(data.gender || "men")
setDescription(data.description || "")

if(data.images && data.images.length > 0){
setImage(data.images[0])
}

}catch(err){

console.error(err)
setError("Failed to load product")

}finally{

setLoading(false)

}

}

fetchProduct()

},[id])

/* ================= UPDATE PRODUCT ================= */

const submitHandler = async(e)=>{

e.preventDefault()

setSaving(true)

try{

const res = await fetch(`http://https://miro-store-1.onrender.com/api/products/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
name,
price,
category,
gender,
description,
images:[image]
})
})

if(!res.ok){
throw new Error("Update failed")
}

navigate("/admin/products")

}catch(err){

console.error(err)
setError("Failed to update product")

}finally{

setSaving(false)

}

}

/* ================= LOADING ================= */

if(loading){
return <p style={{padding:"120px"}}>Loading...</p>
}

/* ================= UI ================= */

return(

<div className="admin-page">

<h1>Edit Product</h1>

{error && <p style={{color:"red"}}>{error}</p>}

<form onSubmit={submitHandler} className="admin-form">

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Product Name"
required
/>

<input
type="number"
value={price}
onChange={(e)=>setPrice(e.target.value)}
placeholder="Price"
required
/>

<input
value={category}
onChange={(e)=>setCategory(e.target.value)}
placeholder="Category"
required
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
>
<option value="men">Men</option>
<option value="women">Women</option>
</select>

<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Description"
required
/>

<input
value={image}
onChange={(e)=>setImage(e.target.value)}
placeholder="/uploads/products/image.png"
/>

{image && (

<div className="admin-preview">

<img
src={`http://https://miro-store-1.onrender.com${image}`}
alt="preview"
/>

</div>

)}

<button type="submit" disabled={saving}>

{saving ? "Updating..." : "Update Product"}

</button>

</form>

</div>

)

}

export default EditProduct