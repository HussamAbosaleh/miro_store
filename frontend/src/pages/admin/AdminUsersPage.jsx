import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Admin.css"

function AdminUsersPage(){

const { token } = useContext(AuthContext)

const [users,setUsers] = useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

/* ================= FETCH USERS ================= */

useEffect(()=>{

const fetchUsers = async()=>{

try{

const res = await fetch("http://localhost:5000/api/admin/users",{
headers:{
Authorization:`Bearer ${token}`
}
})

if(!res.ok){
throw new Error("Failed to fetch users")
}

const data = await res.json()

setUsers(data)

}catch(err){

console.error(err)
setError("Failed to load users")

}finally{

setLoading(false)

}

}

if(token){
fetchUsers()
}

},[token])


/* ================= DELETE USER ================= */

const deleteUser = async(id)=>{

if(!window.confirm("Delete this user?")) return

try{

const res = await fetch(`http://localhost:5000/api/admin/users/${id}`,{
method:"DELETE",
headers:{
Authorization:`Bearer ${token}`
}
})

if(!res.ok){
throw new Error("Delete failed")
}

setUsers(users.filter(u => u._id !== id))

}catch(err){

alert("Failed to delete user")

}

}


/* ================= TOGGLE ADMIN ================= */

const toggleAdmin = async(user)=>{

try{

const res = await fetch(`http://localhost:5000/api/admin/users/${user._id}/role`,{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
isAdmin:!user.isAdmin
})
})

if(!res.ok){
throw new Error("Role update failed")
}

setUsers(users.map(u =>
u._id === user._id ? {...u,isAdmin:!u.isAdmin} : u
))

}catch(err){

alert("Failed to update role")

}

}


/* ================= UI ================= */

if(loading){
return <p style={{padding:"120px"}}>Loading users...</p>
}

if(error){
return <p style={{padding:"120px",color:"red"}}>{error}</p>
}

return(

<div className="admin-page">

<h1>Users</h1>

<table className="admin-table">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{users.map(user => (

<tr key={user._id}>

<td>{user.name}</td>

<td>{user.email}</td>

<td>
{user.isAdmin ? "Admin" : "User"}
</td>

<td className="admin-actions-buttons">

<button
className="admin-btn role"
onClick={()=>toggleAdmin(user)}
>
{user.isAdmin ? "Remove Admin" : "Make Admin"}
</button>

<button
className="admin-btn delete"
onClick={()=>deleteUser(user._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AdminUsersPage