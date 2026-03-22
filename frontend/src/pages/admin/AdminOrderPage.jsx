import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Admin.css"

function AdminOrdersPage(){

const { token } = useContext(AuthContext)

const [orders,setOrders] = useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

useEffect(()=>{

const fetchOrders = async()=>{

try{

const res = await fetch("https://miro-store-1.onrender.com/api/orders",{
headers:{
Authorization:`Bearer ${token}`
}
})

if(!res.ok){
throw new Error("Failed to load orders")
}

const data = await res.json()

setOrders(data)

}catch(err){

console.error(err)
setError("Failed to load orders")

}finally{

setLoading(false)

}

}

if(token){
fetchOrders()
}

},[token])

if(loading){
return <p style={{padding:"120px"}}>Loading orders...</p>
}

if(error){
return <p style={{padding:"120px",color:"red"}}>{error}</p>
}

return(

<div className="admin-page">

<h1>Orders</h1>

<table className="admin-table">

<thead>

<tr>
<th>ID</th>
<th>User</th>
<th>Total</th>
<th>Paid</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{orders.map(order => (

<tr key={order._id}>

<td>{order._id.slice(-6)}</td>

<td>
{order.user?.name || "User"}
</td>

<td>
{order.totalPrice} €
</td>

<td>
{order.isPaid ? "Paid" : "Not Paid"}
</td>

<td>
{new Date(order.createdAt).toLocaleDateString()}
</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AdminOrdersPage