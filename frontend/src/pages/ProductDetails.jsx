import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {

    fetch(`http://https://miro-store-1.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0]);
      })
      .catch(() => setMessage("Failed to load product"));

  }, [id]);



  /* ================= QUANTITY ================= */

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };



  /* ================= ADD TO CART ================= */

  const addToCart = async () => {

    if (!user || !token) {
      setMessage("Please login first");
      navigate("/login");
      return;
    }

    if (!size) {
      setMessage("Please select a size");
      return;
    }

    try {

      const res = await fetch("http://https://miro-store-1.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          size,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to add to cart");
        return;
      }

      navigate("/cart");

    } catch (err) {

      console.error(err);
      setMessage("Something went wrong");

    }

  };



  if (!product) {
    return (
      <div style={{ padding: "120px", textAlign: "center" }}>
        Loading product...
      </div>
    );
  }



  return (

    <div className="product-wrapper">

      {/* ================= TOP NAV ================= */}

      <div className="product-nav">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>

      </div>



      <div className="product-top">

        {/* ================= IMAGE GALLERY ================= */}

        <div className="gallery">

          <img
            className="main-image"
            src={`http://https://miro-store-1.onrender.com${selectedImage}`}
            alt={product.name}
          />

          <div className="thumbs">

            {product.images?.map((img) => (

              <img
                key={img}
                src={`http://https://miro-store-1.onrender.com${img}`}
                alt=""
                className={selectedImage === img ? "active-thumb" : ""}
                onClick={() => setSelectedImage(img)}
              />

            ))}

          </div>

        </div>



        {/* ================= PRODUCT INFO ================= */}

        <div className="product-info">

          <h1>{product.name}</h1>

          <p className="price">{product.price} €</p>

          <p className="short-desc">
            {product.category}
          </p>



          {/* ================= SIZE ================= */}

          <div className="sizes">

            <h4>Select size</h4>

            <div className="sizes-row">

              {product.sizes?.map((s) => (

                <button
                  key={s.size}
                  className={size === s.size ? "active" : ""}
                  onClick={() => {
                    setSize(s.size);
                    setQuantity(1);
                  }}
                >
                  {s.size}
                </button>

              ))}

            </div>

          </div>



          {/* ================= QUANTITY ================= */}

          <div className="qty">

            <button onClick={decreaseQty}>
              -
            </button>

            <span>{quantity}</span>

            <button onClick={increaseQty}>
              +
            </button>

          </div>



          {/* ================= ADD TO CART ================= */}

          <button
            className="product-add-cart"
            onClick={addToCart}
            disabled={!size}
          >
            Add to Cart
          </button>

          {message && <p className="msg">{message}</p>}



          {/* ================= SHIPPING ================= */}

          <div className="shipping-info">

            <p>🚚 Delivery: 4–7 business days (Germany & EU)</p>

            <p>📦 Shipping: Germany Free · EU €9.90 (Free over €99)</p>

            <p>✔ 14-day return policy (EU law)</p>

          </div>

        </div>

      </div>



      {/* ================= PRODUCT DETAILS ================= */}

      <div className="product-description">

        <h3>Product Details</h3>

        <p>
          {product.description} ·
          Material: {product.material} ·
          Fit: {product.fit} ·
          Fabric weight: {product.fabricWeight} ·
          Care: {product.care}
        </p>

      </div>

    </div>

  );

}

export default ProductDetails;