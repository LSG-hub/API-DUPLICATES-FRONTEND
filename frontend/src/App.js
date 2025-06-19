import React from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LookerStudio from './components/Dashboard/LookerStudio';
import DuplicatesList from './components/Dashboard/DuplicatesList';
import './styles/globals.css';

/**
 * Main App component
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Duplicate APIs Detection" />
      
      {/* Main layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Duplicate APIs Detection
              </h1>
              <p className="text-gray-600 mt-2">
                Identify and manage duplicate APIs across your estate
              </p>
            </div>

            {/* First half: Looker Studio Dashboard */}
            <div className="mb-8">
              <LookerStudio height="600px" />
            </div>

            {/* Second half: API Duplicates List */}
            <div>
              <DuplicatesList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;