import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/admin/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("admin_logged_in", "true");
        localStorage.setItem("admin_email", email);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid email or password");
    } finally {
      setLoading(false);
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            style={{ marginBottom: ".8rem" }}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            style={{ marginBottom: ".8rem" }}
          />
          <button className="btn btn-primary" type="submit" style={{ width: "100%" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <div className="login-err" style={{ display: "block" }}>{error}</div>}
        <div style={{ marginTop: "1rem" }}>
          <Link to="/" style={{ fontSize: ".85rem", color: "#2563eb", textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
