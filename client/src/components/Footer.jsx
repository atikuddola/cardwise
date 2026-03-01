import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">Card<span>Wise</span></div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Advertise</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-copy">
        © 2026 CardWise. All rights reserved.<br />
        <strong>Affiliate Disclosure:</strong> CardWise may earn a commission from card issuers when users apply through our links. Our editorial team operates independently and all ratings reflect our unbiased assessment. CardWise is not a financial advisor. Always review cardholder agreements before applying.
      </div>
    </footer>
  );
}
