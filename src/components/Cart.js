import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();

  const handleCheckout = () => {
    const total = getCartTotal();
    if (total === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Shopping Cart ({getCartItemsCount()})</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some apps to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-icon">
                      <span className="icon-emoji">{item.icon}</span>
                    </div>
                    
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.developer}</p>
                      <div className="cart-item-price">
                        {item.price === 'Free' ? 'Free' : `$${item.price}`}
                      </div>
                    </div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <h3>Total: ${getCartTotal().toFixed(2)}</h3>
                </div>
                
                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
