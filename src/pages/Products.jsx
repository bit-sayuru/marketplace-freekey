import { useState } from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

export default function Products() {
  const { products } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ position: 'relative' }}>
      <div className="bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>

      {/* Page Header */}
      <div className="page-header" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="section-tag" style={{ margin: '0 auto 16px' }}>
            <ShoppingBag size={12} /> Marketplace
          </div>
          <h1>
            Our <span className="gradient-text">Premium Products</span>
          </h1>
          <p>Genuine digital subscriptions delivered instantly via WhatsApp</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ position: 'relative', zIndex: 1, paddingBottom: 32 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 360 }}>
              <Search size={16} style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }} />
              <input
                className="form-input"
                style={{ paddingLeft: 42, borderRadius: 50 }}
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ borderRadius: 50 }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
            Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
