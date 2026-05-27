import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header, Footer } from './components';
import { HomePage, CatalogPage, CartPage, ProductPage, ProfilePage, CheckoutPage, ABTestDashboardPage } from './pages';
import './index';

const App: React.FC = () => {
  (window as any).ym(109308702,'reachGoal','start_session', {varian: localStorage.getItem('ab_test_pain_filter')})
  
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <div className="app-container">
              <Header />
              <main className="app-main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/ab-test-dashboard" element={<ABTestDashboardPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
