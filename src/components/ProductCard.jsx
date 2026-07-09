import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function ProductCard({ product }) {
  const { settings } = useProducts();

  const waMessage = encodeURIComponent(
    `Hi FreeKey Store! 🙏\nI want to buy *${product.name}* (${product.validity})\nPrice: LKR ${product.price.toLocaleString()}\n\nPlease help me with the order.`
  );
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=${waMessage}`;

  return (
    <div className="product-card">
      {product.popular && (
        <div style={{
          position: 'absolute', top: 16, right: 16, zIndex: 2,
          background: 'var(--gradient-primary)',
          padding: '4px 12px', borderRadius: '50px',
          fontSize: '0.72rem', fontWeight: 700, color: 'white',
          boxShadow: 'var(--shadow-button)',
        }}>
          ⭐ Best Value
        </div>
      )}

      <div className="product-card-image-placeholder">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '4rem' }}>{product.emoji || '📦'}</span>
        )}
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>

        {/* Validity Highlight */}
        <div className="product-card-validity">
          <span className="product-card-validity-dot" />
          {product.validityLabel || product.validity}
        </div>

        {/* Price */}
        <div className="product-card-price">
          <span className="product-card-currency">LKR</span>
          <span className="product-card-amount">{product.price.toLocaleString()}</span>
          <span className="product-card-period">/ {product.validity}</span>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <ul className="product-card-features">
            {product.features.slice(0, 4).map((f, i) => (
              <li key={i}>
                <span className="feature-check"><CheckCircle2 size={11} /></span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-whatsapp btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            💬 Order Now
          </a>
          <Link to={`/products/${product.id}`} className="btn btn-secondary btn-sm">
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
