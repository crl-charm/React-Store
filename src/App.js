import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import AppGrid from './components/AppGrid';
import SearchBar from './components/SearchBar';
import AuthModal from './components/AuthModal';
import WelcomeMessage from './components/WelcomeMessage';
import AppDetail from './components/AppDetail';
import Home from './components/Home';
import TopCharts from './components/TopCharts';
import { appData } from './data/appData';

function AppContent() {
  const [apps, setApps] = useState(appData);
  const [filteredApps, setFilteredApps] = useState(appData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAppDetail, setShowAppDetail] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  const categories = ['All', 'Games', 'Productivity', 'Social', 'Entertainment', 'Education', 'Business', 'Health'];

  useEffect(() => {
    let filtered = apps;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(app => app.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  }, [selectedCategory, searchQuery, apps]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAuthModalOpen = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowAppDetail(true);
  };

  const handleCloseAppDetail = () => {
    setShowAppDetail(false);
    setSelectedApp(null);
  };

  const handleDownload = (app) => {
    // Simulate download
    alert(`Downloading ${app.name}...`);
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home apps={apps} onViewDetails={handleViewDetails} onDownload={handleDownload} />;
      case 'featured':
        return <Home apps={apps} onViewDetails={handleViewDetails} onDownload={handleDownload} />;
      case 'top-charts':
        return <TopCharts apps={apps} onViewDetails={handleViewDetails} onDownload={handleDownload} />;
      case 'categories':
        return (
          <>
            <SearchBar onSearch={handleSearch} />
            <AppGrid 
              apps={filteredApps} 
              onViewDetails={handleViewDetails}
              onDownload={handleDownload}
            />
          </>
        );
      default:
        return <Home apps={apps} onViewDetails={handleViewDetails} onDownload={handleDownload} />;
    }
  };

  return (
    <div className="App">
      <Header onAuthClick={handleAuthModalOpen} onSectionChange={handleSectionChange} />
      <WelcomeMessage />
      {currentSection === 'categories' && (
        <Navigation 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}
      {renderContent()}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={handleAuthModalClose}
        mode={authMode}
        onModeChange={handleAuthModeChange}
      />
      {showAppDetail && selectedApp && (
        <AppDetail 
          app={selectedApp}
          onClose={handleCloseAppDetail}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
