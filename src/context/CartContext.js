import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('reactStoreCart');
    const savedWishlist = localStorage.getItem('reactStoreWishlist');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('reactStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem('reactStoreWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (app) => {
    const existingItem = cartItems.find(item => item.id === app.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === app.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...app, quantity: 1 }]);
    }
  };

  const removeFromCart = (appId) => {
    setCartItems(cartItems.filter(item => item.id !== appId));
  };

  const updateQuantity = (appId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(appId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === appId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (app) => {
    if (!wishlist.find(item => item.id === app.id)) {
      setWishlist([...wishlist, app]);
    }
  };

  const removeFromWishlist = (appId) => {
    setWishlist(wishlist.filter(item => item.id !== appId));
  };

  const isInCart = (appId) => {
    return cartItems.some(item => item.id === appId);
  };

  const isInWishlist = (appId) => {
    return wishlist.some(item => item.id === appId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price === 'Free' ? 0 : parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
