import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header, Footer } from './components';
import { HomePage, CatalogPage, CartPage, ProductPage } from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-container">
            <Header />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
