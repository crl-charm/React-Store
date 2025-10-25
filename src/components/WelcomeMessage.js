import React from 'react';
import { useAuth } from '../context/AuthContext';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="welcome-message">
      <div className="welcome-container">
        <div className="welcome-content">
          <div className="welcome-icon">👋</div>
          <div className="welcome-text">
            <h3>Welcome back, {user.name}!</h3>
            <p>Discover amazing apps and find your next favorite download.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
