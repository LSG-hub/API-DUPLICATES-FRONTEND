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
    const paddingLeft = level === 0 ? '0.75rem' : '2rem';

    return (
      <div key={item.id}>
        <a
          href="#"
          className={`
            flex items-center pr-3 py-2 text-sm font-medium rounded-md transition-colors
            ${item.active 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
          style={{ paddingLeft }}
        >
          {item.icon && (
            <svg 
              className={`
                h-5 w-5 mr-3
                ${item.active ? 'text-blue-600' : 'text-gray-400'}
              `}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
          )}
          
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              
              {item.count !== null && (
                <span className={`badge ${item.active ? 'badge-primary' : ''}`}>
                  {item.count}
                </span>
              )}
              
              {hasChildren && (
                <svg className="ml-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </>
          )}
        </a>

        {/* Render children if expanded */}
        {hasChildren && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all ${isCollapsed ? 'w-16' : 'w-64'} ${className}`} style={{ transitionDuration: '300ms' }}>
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-lg font-semibold text-gray-900">API Hub</span>
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>

      {/* Bottom navigation */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        {bottomMenuItems.map(item => renderMenuItem(item))}
      </div>

      {/* AI Enhancement Badge */}
      {!isCollapsed && (
        <div className="p-3 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-900">
                  AI Enhanced
                </div>
                <div className="text-xs text-blue-600">
                  Powered by Gemini AI
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;