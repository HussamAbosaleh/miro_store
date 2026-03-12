import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { Bar } from "react-chartjs-2"

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

import "./Admin.css"

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

function AdminDashboard(){

const { token } = useContext(AuthContext)

const [stats,setStats] = useState(null)
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

/* ================= FETCH STATS ================= */

useEffect(()=>{

const fetchStats = async()=>{

try{

const res = await fetch("http://localhost:5000/api/admin/stats",{
headers:{
Authorization:`Bearer ${token}`
}
})

if(!res.ok){
throw new Error("Failed to fetch stats")
}

const data = await res.json()

setStats(data)

}catch(err){

console.error(err)
setError("Failed to load dashboard")

}finally{

setLoading(false)

}

}

if(token){
fetchStats()
}

},[token])

/* ================= LOADING ================= */

if(loading){
return <p style={{padding:"120px"}}>Loading dashboard...</p>
}

if(error){
return <p style={{padding:"120px",color:"red"}}>{error}</p>
}

/* ================= CHART DATA ================= */

const chartData = {
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[
{
label:"Orders",
data:[12,19,9,15,22,30],
backgroundColor:"#111"
}
]
}

const chartOptions = {
responsive:true,
plugins:{
legend:{display:false},
title:{
display:true,
text:"Orders per Month"
}
}
}

/* ================= UI ================= */

return(

<div className="admin-page">

<h1>Admin Dashboard</h1>

<p className="admin-subtitle">
Overview of your store performance
</p>

{/* ================= STATS ================= */}

<div className="admin-grid">

<div className="admin-card users">
<h3>Users</h3>
<p>{stats?.totalUsers || 0}</p>
<span>Total registered users</span>
</div>

<Link to="/admin/products" className="admin-card products">
<h3>Products</h3>
<p>{stats?.totalProducts || 0}</p>
<span>Manage products</span>
</Link>

<div className="admin-card orders">
<h3>Orders</h3>
<p>{stats?.totalOrders || 0}</p>
<span>Total orders placed</span>
</div>

<div className="admin-card revenue">
<h3>Revenue</h3>
<p>{stats?.totalRevenue || 0} €</p>
<span>Total store revenue</span>
</div>

</div>

{/* ================= CHART ================= */}

<div className="admin-chart">

<h2>Orders Overview</h2>

<Bar data={chartData} options={chartOptions} />

</div>

{/* ================= QUICK ACTIONS ================= */}

<div className="admin-actions">

<h2>Quick Actions</h2>

<div className="admin-actions-grid">

<Link to="/admin/products/add" className="admin-action-btn">
Add Product
</Link>

<Link to="/admin/products" className="admin-action-btn">
Manage Products
</Link>

<Link to="/admin/orders" className="admin-action-btn">
View Orders
</Link>

</div>

</div>

</div>

)

}

export default AdminDashboard