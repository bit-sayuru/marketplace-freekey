import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Settings, Package, LayoutDashboard, X, Save, Eye } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const EMOJI_OPTIONS = ['🎨', '🤖', '🎬', '📱', '💡', '🔧', '🎵', '🌐', '📊', '🎮', '📦', '⭐'];
const CATEGORY_OPTIONS = ['Design', 'AI Tools', 'Video Editing', 'Productivity', 'Social Media', 'Business', 'Other'];
const BADGE_COLORS = ['purple', 'cyan', 'green', 'orange'];

const emptyProduct = {
  name: '', tagline: '', description: '', category: 'Design', emoji: '📦',
  price: '', currency: 'LKR', validity: '', validityLabel: '',
  features: ['', '', '', ''], badge: '', badgeColor: 'purple',
  popular: false, imageUrl: '',
};

export default function Admin() {
  const { products, settings, logout, addProduct, updateProduct, deleteProduct, updateSettings, isAdminLoggedIn } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [settingsForm, setSettingsForm] = useState(settings);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      ...product,
      features: product.features && product.features.length > 0
        ? [...product.features, ...Array(Math.max(0, 4 - product.features.length)).fill('')]
        : ['', '', '', ''],
    });
    setShowModal(true);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index, value) => {
    setForm(prev => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const addFeatureField = () => {
    setForm(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const cleanedProduct = {
      ...form,
      price: Number(form.price),
      features: form.features.filter(f => f.trim() !== ''),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, cleanedProduct);
    } else {
      addProduct(cleanedProduct);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const handleSaveSettings = () => {
    updateSettings(settingsForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={16} />, label: 'Dashboard' },
    { id: 'products', icon: <Package size={16} />, label: 'Products' },
    { id: 'settings', icon: <Settings size={16} />, label: 'Settings' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div className="logo-icon" style={{ width: 32, height: 32, fontSize: '0.9rem' }}>🔑</div>
            <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: '1rem' }}>FreeKey</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Admin Panel</span>
        </div>

        <div className="admin-sidebar-title">Navigation</div>

        {navItems.map(item => (
          <button
            key={item.id}
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto', padding: '20px 0 0', borderTop: '1px solid var(--border-color)', marginTop: 16 }}>
          <button className="admin-nav-item" onClick={() => navigate('/')} style={{ color: 'var(--cyan)' }}>
            <Eye size={16} /> View Store
          </button>
          <button className="admin-nav-item" onClick={handleLogout} style={{ color: '#f87171' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* ===== DASHBOARD ===== */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-header">
              <div>
                <h2 className="admin-title">Dashboard</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Welcome back, Admin! 👋</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={openAdd}>
                <Plus size={15} /> Add Product
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Total Products', value: products.length, icon: '📦', color: 'var(--purple)' },
                { label: 'WhatsApp', value: settings.whatsappNumber || 'Not set', icon: '💬', color: '#25D366' },
                { label: 'Store Name', value: settings.storeName, icon: '🔑', color: 'var(--cyan)' },
                { label: 'Currency', value: 'LKR', icon: '💰', color: 'var(--orange)' },
              ].map((stat, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'var(--font-primary)', fontSize: '1.2rem', fontWeight: 700, color: stat.color, marginBottom: 4 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Products Quick View */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1rem' }}>Products Overview</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('products')}>Manage All</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {products.map(p => (
                  <div key={p.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px', background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{p.validity}</div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-primary)', fontWeight: 700,
                      background: 'var(--gradient-text)', WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      LKR {p.price.toLocaleString()}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><Edit size={13} /></button>
                      <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }} onClick={() => setDeleteConfirm(p.id)}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PRODUCTS ===== */}
        {activeTab === 'products' && (
          <div>
            <div className="admin-header">
              <div>
                <h2 className="admin-title">Products</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{products.length} products total</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={openAdd}>
                <Plus size={15} /> Add Product
              </button>
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Validity</th>
                    <th>Price (LKR)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.4rem' }}>{p.emoji}</span>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-purple">{p.category}</span>
                      </td>
                      <td>
                        <span className="badge badge-green">
                          ⏱️ {p.validity}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--purple-light)' }}>
                          {p.price.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${p.popular ? 'badge-orange' : 'badge-cyan'}`}>
                          {p.popular ? '⭐ Featured' : '✓ Active'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)} title="Edit">
                            <Edit size={13} />
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
                            onClick={() => setDeleteConfirm(p.id)}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {activeTab === 'settings' && (
          <div>
            <div className="admin-header">
              <div>
                <h2 className="admin-title">Settings</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Manage store settings</p>
              </div>
            </div>

            <div className="glass-card" style={{ maxWidth: 560 }}>
              <div className="form-group">
                <label className="form-label">Store Name</label>
                <input
                  className="form-input"
                  value={settingsForm.storeName || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, storeName: e.target.value }))}
                  placeholder="FreeKey Store"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Store Tagline</label>
                <input
                  className="form-input"
                  value={settingsForm.tagline || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, tagline: e.target.value }))}
                  placeholder="Premium Digital Tools..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  WhatsApp Number <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>(with country code, no +)</span>
                </label>
                <input
                  className="form-input"
                  value={settingsForm.whatsappNumber || ''}
                  onChange={e => setSettingsForm(p => ({ ...p, whatsappNumber: e.target.value }))}
                  placeholder="94XXXXXXXXX"
                />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 6 }}>
                  Example: 94771234567 (Sri Lanka +94)
                </p>
              </div>

              <button className="btn btn-primary" onClick={handleSaveSettings}>
                <Save size={15} /> {saved ? '✓ Saved!' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== ADD/EDIT MODAL ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Emoji Picker */}
              <div className="form-group">
                <label className="form-label">Product Emoji</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {EMOJI_OPTIONS.map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => handleFormChange('emoji', e)}
                      style={{
                        width: 40, height: 40, borderRadius: 8, fontSize: '1.3rem',
                        background: form.emoji === e ? 'rgba(139,92,246,0.2)' : 'var(--bg-card)',
                        border: form.emoji === e ? '2px solid var(--purple)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                      }}
                    >{e}</button>
                  ))}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input className="form-input" value={form.name} onChange={e => handleFormChange('name', e.target.value)} placeholder="Canva Pro" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
                    {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tagline</label>
                <input className="form-input" value={form.tagline} onChange={e => handleFormChange('tagline', e.target.value)} placeholder="Short catchy tagline" />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" value={form.description} onChange={e => handleFormChange('description', e.target.value)} placeholder="Full product description..." />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Price (LKR) *</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => handleFormChange('price', e.target.value)} placeholder="500" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Validity Period *</label>
                  <input className="form-input" value={form.validity} onChange={e => handleFormChange('validity', e.target.value)} placeholder="Lifetime / 1 Month / 18 Months" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Validity Label (shown as badge)</label>
                <input className="form-input" value={form.validityLabel} onChange={e => handleFormChange('validityLabel', e.target.value)} placeholder="♾️ Lifetime Access" />
              </div>

              {/* Features */}
              <div className="form-group">
                <label className="form-label">Features</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {form.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8 }}>
                      <input
                        className="form-input"
                        value={f}
                        onChange={e => handleFeatureChange(i, e.target.value)}
                        placeholder={`Feature ${i + 1}`}
                      />
                      <button type="button" onClick={() => removeFeature(i)} style={{
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 8, padding: '0 12px', color: '#f87171', cursor: 'pointer',
                      }}><X size={14} /></button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-ghost btn-sm" onClick={addFeatureField} style={{ alignSelf: 'flex-start' }}>
                    <Plus size={14} /> Add Feature
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (optional)</label>
                <input className="form-input" value={form.imageUrl} onChange={e => handleFormChange('imageUrl', e.target.value)} placeholder="https://..." />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={e => handleFormChange('popular', e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'var(--purple)' }}
                  />
                  <span className="form-label" style={{ margin: 0 }}>⭐ Mark as Best Value / Featured</span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.price || !form.validity}>
                <Save size={15} /> {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-body" style={{ textAlign: 'center', padding: '40px 28px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🗑️</div>
              <h3 style={{ marginBottom: 8 }}>Delete Product?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
                This action cannot be undone. The product will be permanently removed.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button
                  className="btn btn-sm"
                  style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', padding: '10px 20px' }}
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
