import React from "react"
import './Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
return(
<footer className="footer">
  <div className="footer-links">
    <a href="/privacy" className="policy">Privacy Policy</a>
    <a href="/terms" className="service">Terms of Service</a>
  </div>

   <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
      </div>

  <p>&copy; {new Date().getFullYear()} Hopeful Hearts. All rights reserved.</p>
</footer>
);
};

export default Footer;