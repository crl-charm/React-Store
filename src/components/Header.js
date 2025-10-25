import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import MobileMenu from './MobileMenu';
import './Header.css';

const Header = ({ onAuthClick, onSectionChange }) => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignInClick = () => {
    onAuthClick('login');
  };

  const handleSignUpClick = () => {
    onAuthClick('signup');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="react-logo">
            <div className="react-icon">
              <div className="react-ring"></div>
              <div className="react-ring"></div>
              <div className="react-ring"></div>
              <div className="react-center"></div>
            </div>
          </div>
          <h1>React Store</h1>
        </div>
        <nav className="header-nav">
          <button className="nav-link" onClick={() => onSectionChange('home')}>Home</button>
          <button className="nav-link" onClick={() => onSectionChange('featured')}>Featured</button>
          <button className="nav-link" onClick={() => onSectionChange('top-charts')}>Top Charts</button>
          <button className="nav-link" onClick={() => onSectionChange('categories')}>Categories</button>
        </nav>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
        <div className="header-actions">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{getCartItemsCount()}</span>
          </button>
          
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="btn-secondary" onClick={handleSignInClick}>
                Sign In
              </button>
              <button className="btn-primary" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        onSectionChange={onSectionChange}
      />
    </header>
  );
};

export default Header;
