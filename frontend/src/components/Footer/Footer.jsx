import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Import Lucide icons
import "./Footer.css";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-container">
        {/* About Section */}
        <div>
          <h1 className="footer-title-main">Komatsu Fleet Command</h1>
          <h2 className="footer-title">ESG &amp; Safety Monitor</h2>
          <p className="footer-text">
            A tender-ready concept for ESG transition simulation and safety governance reporting.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/calculate">Calculator</a></li>
            <li><a href="/redeem">Redeem</a></li>
            <li><a href="mailto:greenfleet@astra.co.id">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div>
          <h2 className="footer-title">Follow Us</h2>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><Facebook size={24} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><Twitter size={24} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={24} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © 2025 Komatsu Fleet Command. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
