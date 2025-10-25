import React from 'react';
import { useCart } from '../context/CartContext';
import './AppCard.css';

const AppCard = ({ app, onViewDetails, onDownload }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useCart();
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  const formatSize = (sizeInMB) => {
    if (sizeInMB < 1) {
      return `${Math.round(sizeInMB * 1024)} KB`;
    }
    return `${sizeInMB} MB`;
  };

  return (
    <div className="app-card">
      <div className="app-icon">
        <span className="icon-emoji">{app.icon}</span>
      </div>
      
      <div className="app-info">
        <h3 className="app-name">{app.name}</h3>
        <p className="app-developer">{app.developer}</p>
        <p className="app-description">{app.description}</p>
        
        <div className="app-meta">
          <div className="app-rating">
            <div className="stars">
              {renderStars(app.rating)}
            </div>
            <span className="rating-value">{app.rating}</span>
            <span className="rating-count">({app.reviewCount})</span>
          </div>
          
          <div className="app-details">
            <span className="app-size">{formatSize(app.size)}</span>
            <span className="app-category">{app.category}</span>
          </div>
        </div>
        
        <div className="app-actions">
          <button className="view-details-btn" onClick={() => onViewDetails(app)}>
            <span className="details-icon">👁️</span>
            View
          </button>
          <button 
            className={`cart-btn ${isInCart(app.id) ? 'in-cart' : ''}`}
            onClick={() => addToCart(app)}
          >
            <span className="cart-icon">🛒</span>
            {isInCart(app.id) ? 'In Cart' : 'Add to Cart'}
          </button>
          <button 
            className={`wishlist-btn ${isInWishlist(app.id) ? 'in-wishlist' : ''}`}
            onClick={() => isInWishlist(app.id) ? removeFromWishlist(app.id) : addToWishlist(app)}
          >
            <span className="wishlist-icon">{isInWishlist(app.id) ? '❤️' : '♡'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
