import "./Contact.css";
import { useState } from "react";

function Contact(){

const [form,setForm] = useState({
name:"",
email:"",
message:""
});

const [sent,setSent] = useState(false);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = (e)=>{
e.preventDefault();
setSent(true);
};

return(

<div className="contact-wrapper">

<h1>Contact Us</h1>

<p className="contact-sub">
Questions about orders, shipping or products?
Send us a message.
</p>

<div className="contact-grid">

{/* CONTACT INFO */}

<div className="contact-info">

<h3>Customer Support</h3>

<p><strong>Email:</strong> support@miro-store.com</p>

<p><strong>Location:</strong> Düsseldorf, Germany</p>

<p><strong>Response time:</strong> 24–48 hours</p>

</div>


{/* CONTACT FORM */}

<form className="contact-form" onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your name"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Your email"
value={form.email}
onChange={handleChange}
required
/>

<textarea
name="message"
placeholder="Your message"
value={form.message}
onChange={handleChange}
required
/>

<button type="submit">
Send Message
</button>

{sent && <p className="sent">Message sent ✓</p>}

</form>

</div>

</div>

)

}

export default Contact;