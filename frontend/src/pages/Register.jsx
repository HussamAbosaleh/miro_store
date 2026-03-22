import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [message,setMessage] = useState("");

const submitHandler = async (e) => {

e.preventDefault();

try{

const res = await fetch("https://miro-store-1.onrender.com/api/users/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,password})
});

const data = await res.json();

if(!res.ok){
setMessage(data.message);
}else{
setMessage("Account created");
navigate("/login");
}

}catch{
setMessage("Registration failed");
}

};

return(

<div className="register-container">

<div className="register-form">

<h2>Create Account</h2>

<form onSubmit={submitHandler}>

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">Register</button>

</form>

{message && <p className="msg">{message}</p>}

<p className="link">

Already have account? <Link to="/login">Login</Link>

</p>

</div>

</div>

)

}

export default Register;