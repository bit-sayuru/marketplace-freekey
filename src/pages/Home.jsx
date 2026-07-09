import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Star, Zap, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const testimonials = [
  { name: 'Kasun P.', role: 'Graphic Designer', text: 'Got Canva Pro at an amazing price! Lifetime access is a steal. Delivery was instant via WhatsApp.', stars: 5, initial: 'K' },
  { name: 'Dilani S.', role: 'Content Creator', text: 'CapCut Pro changed my editing workflow completely. FreeKey Store is super reliable and fast!', stars: 5, initial: 'D' },
  { name: 'Ravindu M.', role: 'Student', text: 'Google AI Pro for just LKR 2200 for 18 months? Absolutely unbelievable deal. 100% recommend!', stars: 5, initial: 'R' },
  { name: 'Nimesha F.', role: 'Freelancer', text: 'Trusted service. Got my Canva Pro in 5 minutes. Very professional and helpful support.', stars: 5, initial: 'N' },
  { name: 'Chamara K.', role: 'YouTuber', text: 'Using CapCut Pro for all my videos now. Best investment I made this year. Thank you FreeKey!', stars: 5, initial: 'C' },
  { name: 'Ayesha R.', role: 'Marketing Manager', text: 'All three products are working perfectly. The team responds instantly on WhatsApp. Love it!', stars: 5, initial: 'A' },
];

const trustItems = [
  { icon: '⚡', title: 'Instant Delivery', desc: 'Get your product via WhatsApp within minutes', color: 'rgba(245,158,11,0.2)' },
  { icon: '🔒', title: '100% Secure', desc: 'Safe and verified digital products', color: 'rgba(16,185,129,0.2)' },
  { icon: '💰', title: 'Best Prices', desc: 'Lowest prices in Sri Lanka, guaranteed', color: 'rgba(139,92,246,0.2)' },
  { icon: '🎯', title: 'Genuine Products', desc: 'Real accounts, real access, no fake stuff', color: 'rgba(59,130,246,0.2)' },
  { icon: '📞', title: '24/7 Support', desc: 'We\'re always here to help you via WhatsApp', color: 'rgba(6,182,212,0.2)' },
  { icon: '♻️', title: 'Easy Renewal', desc: 'Renew anytime with a single WhatsApp message', color: 'rgba(236,72,153,0.2)' },
];

export default function Home() {
  const { products } = useProducts();

  return (
    <div style={{ position: 'relative' }}>
      {/* Background Orbs */}
      <div className="bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Official FreeKey Store Marketplace
            </div>

            <h1 className="hero-title">
              Premium Digital Tools<br />
              <span className="gradient-text">At Unbeatable Prices</span>
            </h1>

            <p className="hero-subtitle">
              Get genuine <strong>Canva Pro</strong>, <strong>Google AI Pro</strong> & <strong>CapCut Pro</strong> subscriptions at Sri Lanka's lowest prices.
              Delivered instantly via WhatsApp. 🇱🇰
            </p>

            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} /> Shop Now
              </Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">500+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
              <div className="hero-stat" style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '0 48px' }}>
                <div className="hero-stat-value">3</div>
                <div className="hero-stat-label">Premium Products</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">⚡ Fast</div>
                <div className="hero-stat-label">Instant Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <ShoppingBag size={12} /> Our Products
            </div>
            <h2 className="section-title">
              Choose Your <span className="gradient-text">Premium Tool</span>
            </h2>
            <p className="section-subtitle">
              All products are genuine and delivered instantly. Order via WhatsApp — it's that simple!
            </p>
          </div>

          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TRUST ===== */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Shield size={12} /> Why Choose Us
            </div>
            <h2 className="section-title">
              Trusted by <span className="gradient-text">Hundreds</span> of Customers
            </h2>
          </div>

          <div className="trust-grid">
            {trustItems.map((item, i) => (
              <div className="trust-item" key={i}>
                <div className="trust-icon" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <div className="trust-title">{item.title}</div>
                <div className="trust-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <Star size={12} /> Testimonials
            </div>
            <h2 className="section-title">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">
                  {'⭐'.repeat(t.stars)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{ padding: '80px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{
            background: 'var(--gradient-card)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-xl)',
            padding: '56px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'var(--gradient-primary)',
              opacity: 0.05,
              borderRadius: 'var(--radius-xl)',
            }} />
            <Zap size={40} color="var(--purple-light)" style={{ marginBottom: 16 }} />
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 16 }}>
              Ready to Get <span className="gradient-text">Started?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.05rem' }}>
              Order now via WhatsApp and get your product delivered in minutes!
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <ShoppingBag size={18} /> Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
