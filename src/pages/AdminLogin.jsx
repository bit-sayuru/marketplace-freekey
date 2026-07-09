import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="bg-effects">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div style={{
            width: 56, height: 56,
            background: 'var(--gradient-primary)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: 'var(--shadow-button)',
          }}>
            <Shield size={26} color="white" />
          </div>
        </div>

        <h2>Admin Panel</h2>
        <p className="login-subtitle">Enter your password to access the admin dashboard</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                required
                style={{ paddingRight: 48 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? '🔓 Authenticating...' : '🔐 Login to Admin'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 24 }}>
          🔑 FreeKey Store — Admin Access Only
        </p>
      </div>
    </div>
  );
}
