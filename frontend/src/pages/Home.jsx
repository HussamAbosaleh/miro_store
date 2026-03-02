import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-wrapper">
      <div className="hero-section">
        <h1>Miro Collection</h1>
        <p>Minimal. Modern. Timeless.</p>
      </div>

      <div className="lux-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="lux-card"
          >
            <div className="image-container">
              <img
                src={`http://localhost:5000${product.images?.[0]}`}
                alt={product.name}
              />
              <div className="overlay">
                <h3>{product.name}</h3>
                <span>{product.price} €</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;