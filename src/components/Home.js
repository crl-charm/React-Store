import React from 'react';
import './Home.css';

const Home = ({ apps, onViewDetails, onDownload }) => {
  // Get featured apps (top rated)
  const featuredApps = apps
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Get top charts (most reviewed)
  const topCharts = apps
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 8);

  // Get new releases (recently added)
  const newReleases = apps
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  return (
    <div className="home">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to React.js Store</h1>
            <p>Discover amazing apps and find your next favorite download</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{apps.length}+</span>
                <span className="stat-label">Apps</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Downloads</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.5</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Apps */}
        <section className="featured-section">
          <div className="section-header">
            <h2>⭐ Featured Apps</h2>
            <p>Hand-picked apps that we love</p>
          </div>
          <div className="featured-grid">
            {featuredApps.map((app) => (
              <div key={app.id} className="featured-card">
                <div className="featured-icon">
                  <span className="icon-emoji">{app.icon}</span>
                </div>
                <div className="featured-info">
                  <h3>{app.name}</h3>
                  <p>{app.developer}</p>
                  <div className="featured-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{app.rating}</span>
                  </div>
                  <button 
                    className="featured-btn"
                    onClick={() => onViewDetails(app)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Charts */}
        <section className="charts-section">
          <div className="section-header">
            <h2>📊 Top Charts</h2>
            <p>Most popular apps this week</p>
          </div>
          <div className="charts-list">
            {topCharts.map((app, index) => (
              <div key={app.id} className="chart-item">
                <div className="chart-rank">#{index + 1}</div>
                <div className="chart-icon">
                  <span className="icon-emoji">{app.icon}</span>
                </div>
                <div className="chart-info">
                  <h4>{app.name}</h4>
                  <p>{app.developer}</p>
                  <div className="chart-meta">
                    <span className="chart-category">{app.category}</span>
                    <span className="chart-price">{app.price === 'Free' ? 'Free' : `$${app.price}`}</span>
                  </div>
                </div>
                <div className="chart-actions">
                  <button 
                    className="chart-download-btn"
                    onClick={() => onDownload(app)}
                  >
                    {app.price === 'Free' ? 'Download' : 'Buy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section className="new-releases-section">
          <div className="section-header">
            <h2>🆕 New Releases</h2>
            <p>Fresh apps just added to the store</p>
          </div>
          <div className="new-releases-grid">
            {newReleases.map((app) => (
              <div key={app.id} className="new-release-card">
                <div className="new-release-icon">
                  <span className="icon-emoji">{app.icon}</span>
                </div>
                <div className="new-release-info">
                  <h3>{app.name}</h3>
                  <p>{app.developer}</p>
                  <div className="new-release-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{app.rating}</span>
                  </div>
                  <div className="new-release-actions">
                    <button 
                      className="new-release-btn"
                      onClick={() => onViewDetails(app)}
                    >
                      View
                    </button>
                    <button 
                      className="new-release-download"
                      onClick={() => onDownload(app)}
                    >
                      {app.price === 'Free' ? 'Download' : `$${app.price}`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
