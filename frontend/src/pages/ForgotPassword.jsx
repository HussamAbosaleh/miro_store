import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {

const [email,setEmail] = useState("");
const [message,setMessage] = useState("");

const submitHandler = async (e) => {

e.preventDefault();

try{

const res = await fetch("http://localhost:5000/api/auth/forgot-password",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({ email })
});

const data = await res.json();

if(!res.ok){
setMessage(data.message || "Something went wrong");
}else{
setMessage("Reset link sent to your email");
}

}catch{
setMessage("Something went wrong");
}

};

return(

<div className="forgot-container">

<div className="forgot-card">

<h2>Reset Password</h2>

<p>
Enter your email address and we will send you a link to reset your password.
</p>

<form onSubmit={submitHandler}>

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<button type="submit">
Send Reset Link
</button>

</form>

{message && <p className="forgot-msg">{message}</p>}

<div className="back-login">

<Link to="/login">
Back to Login
</Link>

</div>

</div>

</div>

);

}

export default ForgotPassword;