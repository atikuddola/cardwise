import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">Card<span>Wise</span></Link>
      <ul className="nav-links">
        <li><a href="#compare">Compare</a></li>
        <li><a href="#features">Why Us</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      {/* <Link to="/admin" className="nav-cta">Admin</Link> */}
    </nav>
  );
}
