import { useSearchParams } from "react-router-dom"
import { useEffect,useState } from "react"

function Search(){

const [products,setProducts] = useState([])
const [searchParams] = useSearchParams()

const query = searchParams.get("q")

useEffect(()=>{

fetch(`http://localhost:5000/api/products?search=${query}`)
.then(res=>res.json())
.then(data=>setProducts(data))

},[query])

return(

<div style={{padding:"120px 40px"}}>

<h2>Search results for "{query}"</h2>

<div className="products-grid">

{products.map(product=>(

<div key={product._id} className="product-card">

<img src={`http://localhost:5000${product.images[0]}`} />

<h3>{product.name}</h3>

<p>{product.price} €</p>

</div>

))}

</div>

</div>

)

}

export default Search