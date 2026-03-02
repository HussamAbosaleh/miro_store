import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        Miro Store
      </Link>

      <div style={styles.links}>
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/cart">Cart</Link>
            <button onClick={logoutHandler} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#111",
    color: "#fff",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "20px",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  button: {
    background: "#ff4d4d",
    border: "none",
    color: "white",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;