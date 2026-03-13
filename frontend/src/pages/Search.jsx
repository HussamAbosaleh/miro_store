import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./Search.css";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5000/api/products?keyword=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
          throw new Error("Failed to load search results");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <p className="search-page-state">Loading...</p>;
  }

  if (error) {
    return <p className="search-page-state">{error}</p>;
  }

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h1>Search Results</h1>
        <p>
          {query ? `Results for "${query}"` : "No search query provided"}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="search-page-state">No products found.</p>
      ) : (
        <div className="search-grid">
          {products.map((product) => {
            const image =
              product.images && product.images.length > 0
                ? `http://localhost:5000${product.images[0]}`
                : "https://via.placeholder.com/400x500";

            return (
              <div key={product._id} className="search-card">
                <Link to={`/product/${product._id}`}>
                  <div className="search-image-box">
                    <img src={image} alt={product.name} />
                  </div>

                  <div className="search-card-info">
                    <h4>{product.name}</h4>
                    <span>{product.price} €</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;