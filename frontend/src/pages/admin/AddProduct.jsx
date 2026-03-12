import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Admin.css"

function AddProduct(){

const { token } = useContext(AuthContext)
const navigate = useNavigate()

const [name,setName] = useState("")
const [price,setPrice] = useState("")
const [category,setCategory] = useState("")
const [gender,setGender] = useState("men")
const [description,setDescription] = useState("")

const [images,setImages] = useState([])
const [preview,setPreview] = useState([])

const [sizes,setSizes] = useState([])

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)


/* ================= IMAGES ================= */

const handleImages = (files)=>{

const filesArray = Array.from(files)

setImages(filesArray)

const previews = filesArray.map(file => URL.createObjectURL(file))

setPreview(previews)

}


/* ================= SIZES ================= */

const handleSizeChange = (e)=>{

const value = e.target.value

if(e.target.checked){
setSizes([...sizes,{size:value}])
}else{
setSizes(sizes.filter(s=>s.size !== value))
}

}


/* ================= SUBMIT ================= */

const submitHandler = async(e)=>{

e.preventDefault()

setLoading(true)

try{

const formData = new FormData()

formData.append("name",name)
formData.append("price",price)
formData.append("category",category)
formData.append("gender",gender)
formData.append("description",description)

formData.append("sizes",JSON.stringify(sizes))

/* multiple images */

images.forEach(img=>{
formData.append("images",img)
})

const res = await fetch("http://localhost:5000/api/products",{
method:"POST",
headers:{
Authorization:`Bearer ${token}`
},
body:formData
})

if(!res.ok){
throw new Error("Failed to create product")
}

navigate("/admin/products")

}catch(err){

console.error(err)
setError("Failed to create product")

}

setLoading(false)

}


/* ================= UI ================= */

return(

<div className="admin-container">

<h1 className="admin-title">Add Product</h1>

{error && <p className="admin-error">{error}</p>}

<form className="admin-form" onSubmit={submitHandler}>

<input
className="admin-input"
placeholder="Product name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
className="admin-input"
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
required
/>

<input
className="admin-input"
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
required
/>

<select
className="admin-select"
value={gender}
onChange={(e)=>setGender(e.target.value)}
>

<option value="men">Men</option>
<option value="women">Women</option>

</select>

<textarea
className="admin-textarea"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>


{/* ================= IMAGES ================= */}

<input
type="file"
multiple
accept="image/*"
onChange={(e)=>handleImages(e.target.files)}
/>

<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

{preview.map((img,i)=>(
<img
key={i}
src={img}
alt="preview"
className="image-preview"
/>
))}

</div>


{/* ================= SIZES ================= */}

<div style={{marginTop:"15px"}}>

<p style={{fontWeight:"600"}}>Sizes</p>

<div style={{display:"flex",gap:"15px",marginTop:"5px"}}>

<label>
<input type="checkbox" value="S" onChange={handleSizeChange}/>
S
</label>

<label>
<input type="checkbox" value="M" onChange={handleSizeChange}/>
M
</label>

<label>
<input type="checkbox" value="L" onChange={handleSizeChange}/>
L
</label>

<label>
<input type="checkbox" value="XL" onChange={handleSizeChange}/>
XL
</label>

</div>

</div>


<button
className="admin-btn"
type="submit"
disabled={loading}
>

{loading ? "Creating..." : "Create Product"}

</button>

</form>

</div>

)

}

export default AddProduct