import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Shield } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">🔑</div>
            <span className="logo-text">Free<span>Key</span></span>
          </Link>

          <ul className="navbar-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          <div className="navbar-cta">
            <Link to="/products" className="btn btn-primary btn-sm">
              <ShoppingBag size={15} /> Shop Now
            </Link>
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} color="white" /> : <>
                <span /><span /><span />
              </>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={() => setMobileOpen(false)}>🏠 Home</NavLink>
        <NavLink to="/products" onClick={() => setMobileOpen(false)}>🛍️ Products</NavLink>
        <NavLink to="/contact" onClick={() => setMobileOpen(false)}>📞 Contact</NavLink>
        <Link to="/admin" onClick={() => setMobileOpen(false)} style={{ color: 'var(--purple-light)' }}>
          <Shield size={14} style={{ marginRight: 6 }} />Admin Panel
        </Link>
      </div>
    </>
  );
}
