import React, { useState } from 'react';
import './TopCharts.css';

const TopCharts = ({ apps, onViewDetails, onDownload }) => {
  const [timeFilter, setTimeFilter] = useState('week');

  // Sort apps by different criteria based on time filter
  const getTopApps = () => {
    switch (timeFilter) {
      case 'day':
        return apps.sort((a, b) => b.rating - a.rating).slice(0, 20);
      case 'week':
        return apps.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
      case 'month':
        return apps.sort((a, b) => b.id - a.id).slice(0, 20);
      default:
        return apps.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
    }
  };

  const topApps = getTopApps();

  return (
    <div className="top-charts">
      <div className="top-charts-container">
        <div className="top-charts-header">
          <h1>📊 Top Charts</h1>
          <p>Most popular apps across different categories</p>
          
          <div className="time-filters">
            <button 
              className={`filter-btn ${timeFilter === 'day' ? 'active' : ''}`}
              onClick={() => setTimeFilter('day')}
            >
              Today
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
              onClick={() => setTimeFilter('week')}
            >
              This Week
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
              onClick={() => setTimeFilter('month')}
            >
              This Month
            </button>
          </div>
        </div>

        <div className="charts-grid">
          {topApps.map((app, index) => (
            <div key={app.id} className={`chart-card rank-${index + 1}`}>
              <div className="chart-rank">
                <span className="rank-number">#{index + 1}</span>
                {index < 3 && <span className="rank-badge">🏆</span>}
              </div>
              
              <div className="chart-app-info">
                <div className="chart-icon">
                  <span className="icon-emoji">{app.icon}</span>
                </div>
                
                <div className="chart-details">
                  <h3 className="chart-title">{app.name}</h3>
                  <p className="chart-developer">{app.developer}</p>
                  
                  <div className="chart-stats">
                    <div className="chart-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-value">{app.rating}</span>
                      <span className="review-count">({app.reviewCount.toLocaleString()})</span>
                    </div>
                    
                    <div className="chart-meta">
                      <span className="chart-category">{app.category}</span>
                      <span className="chart-size">{app.size} MB</span>
                      <span className={`chart-price ${app.price === 'Free' ? 'free' : 'paid'}`}>
                        {app.price === 'Free' ? 'Free' : `$${app.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="chart-actions">
                <button 
                  className="chart-view-btn"
                  onClick={() => onViewDetails(app)}
                >
                  <span className="btn-icon">👁️</span>
                  View Details
                </button>
                <button 
                  className="chart-download-btn"
                  onClick={() => onDownload(app)}
                >
                  <span className="btn-icon">⬇️</span>
                  {app.price === 'Free' ? 'Download' : `Buy $${app.price}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="category-breakdown">
          <h2>Top Apps by Category</h2>
          <div className="category-grid">
            {['Games', 'Productivity', 'Social', 'Entertainment', 'Education', 'Business', 'Health'].map(category => {
              const categoryApps = apps
                .filter(app => app.category === category)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3);
              
              return (
                <div key={category} className="category-section">
                  <h3>{category}</h3>
                  <div className="category-apps">
                    {categoryApps.map((app, index) => (
                      <div key={app.id} className="category-app">
                        <div className="category-rank">#{index + 1}</div>
                        <div className="category-icon">
                          <span className="icon-emoji">{app.icon}</span>
                        </div>
                        <div className="category-info">
                          <h4>{app.name}</h4>
                          <div className="category-rating">
                            <span className="stars">★★★★★</span>
                            <span className="rating">{app.rating}</span>
                          </div>
                        </div>
                        <button 
                          className="category-download"
                          onClick={() => onDownload(app)}
                        >
                          {app.price === 'Free' ? 'Free' : `$${app.price}`}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
