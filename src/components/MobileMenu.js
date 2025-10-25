import React, { useState } from 'react';
import './MobileMenu.css';

const MobileMenu = ({ onSectionChange, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSectionClick = (section) => {
    onSectionChange(section);
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <h3>React Store</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <nav className="mobile-menu-nav">
          <button 
            className="mobile-nav-item"
            onClick={() => handleSectionClick('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>
          <button 
            className="mobile-nav-item"
            onClick={() => handleSectionClick('featured')}
          >
            <span className="nav-icon">⭐</span>
            Featured
          </button>
          <button 
            className="mobile-nav-item"
            onClick={() => handleSectionClick('top-charts')}
          >
            <span className="nav-icon">📊</span>
            Top Charts
          </button>
          <button 
            className="mobile-nav-item"
            onClick={() => handleSectionClick('categories')}
          >
            <span className="nav-icon">📂</span>
            Categories
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
