import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {

const { token } = useParams();
const navigate = useNavigate();

const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [message,setMessage] = useState("");

const submitHandler = async (e) => {

e.preventDefault();

if(password !== confirmPassword){
setMessage("Passwords do not match");
return;
}

try{

const res = await fetch(`http://localhost:5000/api/users/reset-password/${token}`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({ password })
});

const data = await res.json();

if(!res.ok){
setMessage(data.message || "Something went wrong");
}else{

setMessage("Password updated successfully");

setTimeout(()=>{
navigate("/login");
},2000);

}

}catch{
setMessage("Server error");
}

};

return(

<div className="reset-container">

<div className="reset-card">

<h2>Reset Password</h2>

<p>
Enter your new password.
</p>

<form onSubmit={submitHandler}>

<input
type="password"
placeholder="New password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<input
type="password"
placeholder="Confirm password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

<button type="submit">
Reset Password
</button>

</form>

{message && <p className="reset-msg">{message}</p>}

<div className="back-login">

<Link to="/login">
Back to Login
</Link>

</div>

</div>

</div>

);

}

export default ResetPassword;