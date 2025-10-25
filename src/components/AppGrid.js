import React from 'react';
import AppCard from './AppCard';
import './AppGrid.css';

const AppGrid = ({ apps, onViewDetails, onDownload }) => {
  if (apps.length === 0) {
    return (
      <div className="app-grid-container">
        <div className="no-apps">
          <div className="no-apps-icon">📱</div>
          <h3>No apps found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-grid-container">
      <div className="app-grid">
        {apps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            onViewDetails={onViewDetails}
            onDownload={onDownload}
          />
        ))}
      </div>
    </div>
  );
};

export default AppGrid;
