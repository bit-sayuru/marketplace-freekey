import { createContext, useContext, useState, useEffect } from 'react';
import { defaultProducts } from '../data/products';

const ProductContext = createContext(null);

const ADMIN_PASSWORD = 'S@yuru3536';
const STORAGE_KEY = 'freekey_products';
const SETTINGS_KEY = 'freekey_settings';
const AUTH_KEY = 'freekey_admin_auth';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {
        whatsappNumber: '94XXXXXXXXX',
        storeName: 'FreeKey Store',
        tagline: 'Premium Digital Tools at Unbeatable Prices',
      };
    } catch {
      return {
        whatsappNumber: '94XXXXXXXXX',
        storeName: 'FreeKey Store',
        tagline: 'Premium Digital Tools at Unbeatable Prices',
      };
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdminLoggedIn(false);
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      popular: product.popular || false,
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProduct = (id) => products.find(p => p.id === id);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ProductContext.Provider value={{
      products, settings,
      isAdminLoggedIn, login, logout,
      addProduct, updateProduct, deleteProduct, getProduct,
      updateSettings,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};
