import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Clock, Shield, Zap, Star } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct, products, settings } = useProducts();
  const navigate = useNavigate();

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="not-found">
        <div>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>😕</div>
          <h2>Product not found</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>
            This product doesn't exist or has been removed.
          </p>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const waMessage = encodeURIComponent(
    `Hi FreeKey Store! 🙏\nI want to buy *${product.name}*\nValidity: ${product.validity}\nPrice: LKR ${product.price.toLocaleString()}\n\nPlease help me with the order.`
  );
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=${waMessage}`;

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 2);

  return (
    <div style={{ position: 'relative', paddingTop: 70 }}>
      <div className="bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/products">Products</Link>
          <span>›</span>
          <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Left Column */}
          <div>
            {/* Product Image */}
            <div className="detail-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="detail-image-placeholder">
                  {product.emoji || '📦'}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="detail-features-section">
              <h3>✨ What's Included</h3>
              <ul className="detail-features-list">
                {product.features && product.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-check" style={{ width: 22, height: 22 }}>
                      <CheckCircle2 size={13} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 32 }}>
              {[
                { icon: <Zap size={18} />, title: 'Instant', desc: 'Via WhatsApp', color: '#fbbf24' },
                { icon: <Shield size={18} />, title: 'Genuine', desc: '100% Verified', color: '#34d399' },
                { icon: <Star size={18} />, title: '5 Star', desc: 'Rated Service', color: '#a78bfa' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '16px 12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}>
                  <div style={{ color: item.color, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="detail-sidebar">
            <div className="detail-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: '2.5rem' }}>{product.emoji || '📦'}</span>
                <div>
                  <span className="product-card-category">{product.category}</span>
                  <h1 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-primary)', marginTop: 4 }}>
                    {product.name}
                  </h1>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 20, lineHeight: 1.7 }}>
                {product.description}
              </p>

              {/* Validity Highlight - Prominent */}
              <div className="detail-validity-badge">
                <Clock size={16} />
                <span>Valid for: <strong>{product.validity}</strong></span>
              </div>

              {/* Price */}
              <div className="detail-price-block">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 600 }}>LKR</span>
                  <span className="detail-price">{product.price.toLocaleString()}</span>
                </div>
                <div className="detail-period">One-time payment for {product.validity}</div>
              </div>

              {/* Order Button */}
              <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp detail-buy-btn">
                💬 Order via WhatsApp
              </a>

              {/* Guarantee */}
              <div className="detail-guarantee">
                <Shield size={13} />
                Genuine product — 100% satisfaction guaranteed
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

              {/* Quick Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: '📦 Product', value: product.name },
                  { label: '⏱️ Validity', value: product.validity },
                  { label: '💳 Price', value: `LKR ${product.price.toLocaleString()}` },
                  { label: '🚀 Delivery', value: 'Instant via WhatsApp' },
                  { label: '🔄 Renewal', value: 'Available anytime' },
                ].map((info, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '0.82rem', padding: '6px 0',
                    borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{info.label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 64 }}>
            <h2 style={{ marginBottom: 28, fontFamily: 'var(--font-primary)' }}>
              You Might Also Like
            </h2>
            <div className="products-grid">
              {relatedProducts.map(p => (
                <div key={p.id} className="product-card" onClick={() => navigate(`/products/${p.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="product-card-image-placeholder">
                    <span style={{ fontSize: '3rem' }}>{p.emoji || '📦'}</span>
                  </div>
                  <div className="product-card-body">
                    <span className="product-card-category">{p.category}</span>
                    <h3 className="product-card-title">{p.name}</h3>
                    <div className="product-card-validity">
                      <span className="product-card-validity-dot" />
                      {p.validityLabel || p.validity}
                    </div>
                    <div className="product-card-price">
                      <span className="product-card-currency">LKR</span>
                      <span className="product-card-amount">{p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
