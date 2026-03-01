import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ADMIN_PASS = "cardwise786";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      localStorage.setItem("admin_logged_in", "true");
      navigate("/admin/dashboard");
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
      <div className="login-box">
        <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🔐</div>
        <h2>Admin Login</h2>
        <p>CardWise dashboard access</p>
        <form onSubmit={handleLogin}>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            style={{ marginBottom: ".8rem" }}
          />
          <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Login</button>
        </form>
        {error && <div className="login-err" style={{ display: "block" }}>Incorrect password. Try again.</div>}
        <div style={{ marginTop: "1rem" }}>
          <Link to="/" style={{ fontSize: ".85rem", color: "#2563eb", textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
