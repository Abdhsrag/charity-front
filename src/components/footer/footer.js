import "./footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/contact" className="footer-link">
          Contact Us
        </a>
        <a href="/about" className="footer-link">
          About
        </a>
      </div>

      <div className="footer-logo d-flex align-items-center gap-3">
        <Link to="/" className="footer-logo-link">
          <i className="bi bi-instagram"></i>
        </Link>
        <Link to="/" className="footer-logo-link">
          <i className="bi bi-facebook"></i>
        </Link>
        <Link to="/" className="footer-logo-link">
          <i className="bi bi-twitter"></i>
        </Link>
        <Link to="/" className="footer-logo-link">
          <i className="bi bi-linkedin"></i>
        </Link>
      </div>

      <div className="footer-copyright">
        © 2025 Chariytable. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;