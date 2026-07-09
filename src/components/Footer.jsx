import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { Mail, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const { settings } = useProducts();

  return (
    <footer className="footer">
      <div className="gradient-divider" />
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
                <div className="logo-icon">🔑</div>
                <span className="logo-text">Free<span>Key</span></span>
              </Link>
              <p>Your trusted source for premium digital tools at unbeatable prices. Canva Pro, Google AI Pro, CapCut Pro & more — delivered instantly.</p>
              <div className="footer-social">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank" rel="noreferrer"
                  className="social-link"
                  title="WhatsApp"
                >💬</a>
                <a href="https://www.freekey.store/" target="_blank" rel="noreferrer" className="social-link" title="Website">
                  <Globe size={16} />
                </a>
                <a href="mailto:support@freekey.store" className="social-link" title="Email">
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Products</h4>
              <ul className="footer-links">
                <li><Link to="/products">All Products</Link></li>
                <li><Link to="/products">Canva Pro</Link></li>
                <li><Link to="/products">Google AI Pro</Link></li>
                <li><Link to="/products">CapCut Pro</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="https://www.freekey.store/" target="_blank" rel="noreferrer">Official Site</a></li>
                <li><Link to="/admin">Admin Panel</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp Support</a></li>
                <li><Link to="/contact">Get Help</Link></li>
                <li><a href="https://www.freekey.store/" target="_blank" rel="noreferrer">Main Website</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FreeKey Store. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Made with <Heart size={13} color="#ec4899" fill="#ec4899" /> by FreeKey Team
          </p>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20FreeKey%20Store!%20I%27m%20interested%20in%20purchasing%20a%20product.`}
        target="_blank" rel="noreferrer"
        className="whatsapp-float"
        title="Chat on WhatsApp"
      >💬</a>
    </footer>
  );
}
