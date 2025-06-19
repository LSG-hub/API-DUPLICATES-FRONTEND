import React from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LookerStudio from './components/Dashboard/LookerStudio';
import DuplicatesList from './components/Dashboard/DuplicatesList';
import './styles/main.css';

/**
 * Main App component - Keep the same modular structure
 */
function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <Header title="Duplicate APIs Detection" />
      
      {/* Main layout */}
      <div className="app-layout">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="app-main">
          <div className="app-content">
            {/* Page header */}
            <div className="page-header">
              <h1 className="page-title">
                Duplicate APIs Detection
              </h1>
              <p className="page-description">
                Identify and manage duplicate APIs across your estate
              </p>
            </div>

            {/* First half: Looker Studio Dashboard */}
            <div className="dashboard-section">
              <LookerStudio height="600px" />
            </div>

            {/* Second half: API Duplicates List */}
            <div className="duplicates-section">
              <DuplicatesList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;