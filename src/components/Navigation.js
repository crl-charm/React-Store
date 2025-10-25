import React from 'react';
import './Navigation.css';

const Navigation = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`nav-category ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
