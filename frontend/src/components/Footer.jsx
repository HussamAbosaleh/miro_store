import logo from "../assets/logo-footer.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-wrapper">

        <div className="footer-container">

          {/* Brand */}

          <div className="footer-brand">

            <img src={logo} className="footer-logo" alt="Miro" />

            <p className="footer-description">
              Designed with intention. Built to last.
            </p>

            <p className="footer-location">
              Düsseldorf — Germany
            </p>

            <div className="footer-social">

              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
              <a href="#">Facebook</a>

            </div>

          </div>


          {/* Explore */}

          <div className="footer-links">

            <h3>Explore</h3>

            <a href="/">Home</a>
            <a href="/men">Men</a>
            <a href="/women">Women</a>
            <a href="/contact">Contact</a>

          </div>


          {/* Legal */}

          <div className="footer-links">

            <h3>Legal</h3>

            <a href="#">Legal Notice</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Terms Of Service</a>

          </div>


          {/* Newsletter */}

          <div className="footer-newsletter">

            <h3>Newsletter</h3>

            <p>
              Subscribe for new collections and offers.
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


        <div className="footer-bottom">
          © 2026 MIRO. All rights reserved
        </div>

      </div>

    </footer>
  );
}

export default Footer;