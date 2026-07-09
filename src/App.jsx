import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Contact from './pages/Contact';

function ProtectedAdmin() {
  const { isAdminLoggedIn } = useProducts();
  return isAdminLoggedIn ? <Admin /> : <Navigate to="/admin/login" replace />;
}

function AppRoutes() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={
              <div className="not-found" style={{ paddingTop: 70 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '5rem', marginBottom: 16 }}>404</div>
                  <h2>Page Not Found</h2>
                  <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>The page you're looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary">Go Home</a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ProductProvider>
      <AppRoutes />
    </ProductProvider>
  );
}
