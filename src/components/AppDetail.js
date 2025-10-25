import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AppDetail.css';

const AppDetail = ({ app, onClose, onDownload }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Amazing app! Really love the interface and functionality.',
      date: '2024-01-15',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      rating: 4,
      comment: 'Great app, but could use some improvements in the UI.',
      date: '2024-01-14',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=764ba2&color=fff'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 5,
      comment: 'Perfect for my needs. Highly recommended!',
      date: '2024-01-13',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=61dafb&color=fff'
    }
  ]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (userRating > 0 && userComment.trim()) {
      const newComment = {
        id: Date.now(),
        user: user.name,
        rating: userRating,
        comment: userComment,
        date: new Date().toISOString().split('T')[0],
        avatar: user.avatar
      };
      setComments([newComment, ...comments]);
      setUserRating(0);
      setUserComment('');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleDownload = () => {
    onDownload(app);
    // Simulate download
    alert(`Downloading ${app.name}...`);
  };

  return (
    <div className="app-detail-overlay" onClick={onClose}>
      <div className="app-detail" onClick={(e) => e.stopPropagation()}>
        <div className="app-detail-header">
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="app-detail-content">
          <div className="app-detail-hero">
            <div className="app-icon-large">
              <span className="icon-emoji">{app.icon}</span>
            </div>
            <div className="app-info">
              <h1 className="app-title">{app.name}</h1>
              <p className="app-developer">{app.developer}</p>
              <div className="app-rating-large">
                <div className="stars">
                  {renderStars(Math.floor(app.rating))}
                </div>
                <span className="rating-value">{app.rating}</span>
                <span className="rating-count">({app.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <div className="app-meta-large">
                <span className="app-size">{app.size} MB</span>
                <span className="app-category">{app.category}</span>
                <span className="app-price">{app.price === 'Free' ? 'Free' : `$${app.price}`}</span>
              </div>
              <button className="download-btn-large" onClick={handleDownload}>
                <span className="download-icon">⬇️</span>
                {app.price === 'Free' ? 'Download' : `Buy for $${app.price}`}
              </button>
            </div>
          </div>

          <div className="app-detail-tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`tab ${activeTab === 'screenshots' ? 'active' : ''}`}
              onClick={() => setActiveTab('screenshots')}
            >
              Screenshots
            </button>
          </div>

          <div className="app-detail-body">
            {activeTab === 'overview' && (
              <div className="tab-content">
                <h3>Description</h3>
                <p>{app.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                
                <h3>Features</h3>
                <ul className="features-list">
                  <li>High-quality performance</li>
                  <li>Intuitive user interface</li>
                  <li>Regular updates and improvements</li>
                  <li>Cross-platform compatibility</li>
                  <li>24/7 customer support</li>
                </ul>

                <h3>System Requirements</h3>
                <div className="requirements">
                  <div className="requirement">
                    <strong>OS:</strong> iOS 12.0+ / Android 8.0+
                  </div>
                  <div className="requirement">
                    <strong>Storage:</strong> {app.size} MB available space
                  </div>
                  <div className="requirement">
                    <strong>RAM:</strong> 2GB minimum
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-content">
                {user && (
                  <div className="add-review">
                    <h3>Write a Review</h3>
                    <form onSubmit={handleRatingSubmit} className="review-form">
                      <div className="rating-input">
                        <label>Your Rating:</label>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`star ${star <= userRating ? 'filled' : 'empty'}`}
                              onClick={() => setUserRating(star)}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <textarea
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        placeholder="Write your review..."
                        className="comment-input"
                        rows="4"
                      />
                      <button type="submit" className="submit-review-btn">
                        Submit Review
                      </button>
                    </form>
                  </div>
                )}

                <div className="reviews-list">
                  <h3>User Reviews</h3>
                  {comments.map((comment) => (
                    <div key={comment.id} className="review-item">
                      <div className="review-header">
                        <img src={comment.avatar} alt={comment.user} className="review-avatar" />
                        <div className="review-info">
                          <div className="review-user">{comment.user}</div>
                          <div className="review-rating">
                            {renderStars(comment.rating)}
                            <span className="review-date">{comment.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="review-comment">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'screenshots' && (
              <div className="tab-content">
                <h3>Screenshots</h3>
                <div className="screenshots-grid">
                  <div className="screenshot-placeholder">
                    <span>📱</span>
                    <p>Main Interface</p>
                  </div>
                  <div className="screenshot-placeholder">
                    <span>⚙️</span>
                    <p>Settings</p>
                  </div>
                  <div className="screenshot-placeholder">
                    <span>📊</span>
                    <p>Dashboard</p>
                  </div>
                  <div className="screenshot-placeholder">
                    <span>🔧</span>
                    <p>Tools</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;
