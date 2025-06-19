import React from 'react';

/**
 * Header component for the application
 */
const Header = ({ title = 'API Duplicates Dashboard', className = '' }) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and title */}
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Logo */}
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DA</span>
              </div>
              
              {/* Title */}
              <div className="ml-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  DigitalAPI Helix
                </h1>
                <p className="text-sm text-gray-500">
                  {title}
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search (optional) */}
          <div className="flex-1 max-w-lg mx-8" style={{ display: 'none' }}>
            <div className="relative">
              <div className="absolute" style={{ top: '50%', left: '0.75rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search APIs..."
                className="form-input pl-10"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Right side - Actions and user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              </svg>
              {/* Notification badge */}
              <span className="absolute" style={{ top: '0', right: '0', width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#ef4444', border: '2px solid white' }}></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full transition-colors">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left" style={{ display: 'block' }}>
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">john.doe@company.com</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search (shown on smaller screens) */}
      <div className="border-t border-gray-200 px-4 py-3" style={{ display: 'none' }}>
        <div className="relative">
          <div className="absolute" style={{ top: '50%', left: '0.75rem', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search APIs..."
            className="form-input pl-10"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;