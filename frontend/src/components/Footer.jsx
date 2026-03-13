import logo from "../assets/logo-footer.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from "react-icons/fa";

function Footer() {
  return (

<footer className="footer">

<div className="footer-wrapper">

{/* ================= الفوتر ================= */}

<div className="footer-container">

{/* BRAND */}

<div className="footer-brand">

<img src={logo} className="footer-logo" alt="Miro" />

<p className="footer-description">
Timeless minimal clothing designed for everyday comfort.
</p>

<p className="footer-location">
Düsseldorf — Germany
</p>

<div className="footer-social">

<a
href="https://instagram.com"
target="_blank"
rel="noopener noreferrer"
>
Instagram
</a>

<a
href="https://tiktok.com"
target="_blank"
rel="noopener noreferrer"
>
TikTok
</a>

<a
href="https://facebook.com"
target="_blank"
rel="noopener noreferrer"
>
Facebook
</a>

</div>

</div>


{/* EXPLORE */}

<div className="footer-links">

<h3>Explore</h3>

<Link to="/">Home</Link>
<Link to="/products?gender=men">Men</Link>
<Link to="/products?gender=women">Women</Link>
<Link to="/contact">Contact</Link>

</div>


{/* LEGAL */}

<div className="footer-links">

<h3>Legal</h3>

<Link to="/legal">Legal Notice</Link>
<Link to="/privacy">Privacy Policy</Link>
<Link to="/refund">Refund Policy</Link>
<Link to="/shipping">Shipping Policy</Link>
<Link to="/terms">Terms of Service</Link>

</div>


{/* NEWSLETTER */}

<div className="footer-newsletter">

<h3>Newsletter</h3>

<p>
Subscribe for new collections and exclusive offers.
</p>

<div className="newsletter-box">

<input
type="email"
placeholder="Your email"
/>

<button>
Subscribe
</button>

</div>

</div>

</div>


{/* ================= BOTTOM ================= */}

<div className="footer-bottom">

<p>© 2026 MIRO. All rights reserved</p>

<div className="footer-bottom-bar">

{/* PAYMENTS */}

<div className="footer-payments">

<FaCcVisa />
<FaCcMastercard />
<FaCcPaypal />
<FaApplePay />

</div>

{/* LANGUAGE */}

<div className="footer-settings">

<select>
<option>English</option>
<option>Deutsch</option>
</select>

<select>
<option>EUR €</option>
<option>USD $</option>
</select>

</div>

</div>

</div>

</div>

</footer>

  );
}

export default Footer;