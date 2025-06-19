import React from 'react';

/**
 * Header component for the application
 */
const Header = ({ title = 'API Duplicates Dashboard', className = '' }) => {
  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Left side - Logo and title */}
          <div className="header-left">
            <div className="header-brand">
              {/* Logo */}
              <div className="header-logo">
                <span className="header-logo-text">DA</span>
              </div>
              
              {/* Title */}
              <div className="header-title-section">
                <h1 className="header-main-title">
                  DigitalAPI Helix
                </h1>
                <p className="header-subtitle">
                  {title}
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search (optional, hidden by default) */}
          <div className="header-search">
            <div className="search-container">
              <div className="search-icon">
                <svg className="search-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search APIs..."
                className="search-input"
              />
            </div>
          </div>

          {/* Right side - Actions and user menu */}
          <div className="header-right">
            {/* Notifications */}
            <button className="header-action-btn">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              </svg>
              {/* Notification badge */}
              <span className="notification-badge"></span>
            </button>

            {/* Settings */}
            <button className="header-action-btn">
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User menu */}
            <div className="user-menu">
              <button className="user-menu-btn">
                <div className="user-avatar">
                  <svg className="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="user-info">
                  <div className="user-name">John Doe</div>
                  <div className="user-email">john.doe@company.com</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search (shown on smaller screens) */}
      <div className="mobile-search">
        <div className="mobile-search-container">
          <div className="search-icon">
            <svg className="search-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search APIs..."
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;