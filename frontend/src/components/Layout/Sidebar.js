import React, { useState } from 'react';

/**
 * Sidebar component for navigation
 */
const Sidebar = ({ className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
      active: false,
      count: null
    },
    {
      id: 'api-intelligence',
      label: 'API Intelligence',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      active: false,
      count: null,
      children: [
        {
          id: 'api-dedupe',
          label: 'API DeDupe',
          active: true,
          count: 5
        },
        {
          id: 'api-governance',
          label: 'API Governance',
          active: false,
          count: null
        }
      ]
    },
    {
      id: 'api-catalog',
      label: 'API Catalog',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      active: false,
      count: 247
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      active: false,
      count: null
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      active: false
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      active: false
    }
  ];

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemClasses = [
      'sidebar-menu-item',
      item.active ? 'sidebar-menu-item-active' : '',
      level > 0 ? 'sidebar-menu-item-child' : ''
    ].filter(Boolean).join(' ');

    return (
      <div key={item.id}>
        <a
          href="#"
          className={itemClasses}
        >
          {item.icon && (
            <svg 
              className={`sidebar-menu-icon ${item.active ? 'sidebar-menu-icon-active' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
          )}
          
          {!isCollapsed && (
            <>
              <span className="sidebar-menu-label">{item.label}</span>
              
              {item.count !== null && (
                <span className={`badge ${item.active ? 'badge-primary' : 'badge-default'}`}>
                  {item.count}
                </span>
              )}
              
              {hasChildren && (
                <svg className="sidebar-menu-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </>
          )}
        </a>

        {/* Render children if expanded */}
        {hasChildren && !isCollapsed && (
          <div className="sidebar-submenu">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarClasses = [
    'sidebar',
    isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sidebarClasses}>
      {/* Sidebar header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-brand">
            <svg className="sidebar-brand-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="sidebar-brand-text">API Hub</span>
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="sidebar-toggle"
        >
          {isCollapsed ? (
            <svg className="sidebar-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="sidebar-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="sidebar-nav">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Bottom navigation */}
      <div className="sidebar-footer-nav">
        {bottomMenuItems.map(item => renderMenuItem(item))}
      </div>

      {/* AI Enhancement Badge */}
      {!isCollapsed && (
        <div className="sidebar-ai-badge">
          <div className="ai-badge-content">
            <div className="ai-badge-icon">
              <svg className="ai-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="ai-badge-title">
                AI Enhanced
              </div>
              <div className="ai-badge-subtitle">
                Powered by Gemini AI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;