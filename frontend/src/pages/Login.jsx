import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const { login } = useContext(AuthContext);
const navigate = useNavigate();

const submitHandler = async (e) => {

e.preventDefault();

setError("");
setLoading(true);

try {

const res = await fetch("http://localhost:5000/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email, password }),
});

const data = await res.json();

if (res.ok) {

/* حفظ المستخدم والتوكن */
login(data);

/* توجيه حسب الدور */
if (data.user.role === "admin") {
navigate("/admin");
} else {
navigate("/profile");
}

} else {

setError(data.message || "Login failed");

}

} catch (err) {

console.error(err);
setError("Server error. Try again.");

} finally {

setLoading(false);

}

};

return (

<div className="login-container">

<div className="login-image">
<div className="login-overlay">
<h1>Welcome Back</h1>
<p>Discover minimalist fashion designed for everyday life</p>
</div>
</div>

<div className="login-form">

<div className="form-box">

<h2>Login</h2>

{error && <p className="login-error">{error}</p>}

<form onSubmit={submitHandler}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>

<button type="submit" disabled={loading}>
{loading ? "Logging in..." : "Login"}
</button>

</form>

<div className="login-links">

<Link to="/forgot-password">Forgot password?</Link>

<p>
Don't have an account? <Link to="/register">Register</Link>
</p>

</div>

</div>

</div>

</div>

);

}

export default Login;