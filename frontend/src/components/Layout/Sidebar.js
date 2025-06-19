import React, { useState } from 'react';
import { 
  Home, 
  Database, 
  GitBranch, 
  BarChart3, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import Badge from '../UI/Badge';

/**
 * Sidebar component for navigation
 */
const Sidebar = ({ className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      active: false,
      count: null
    },
    {
      id: 'api-intelligence',
      label: 'API Intelligence',
      icon: BarChart3,
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
      icon: Database,
      active: false,
      count: 247
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: GitBranch,
      active: false,
      count: null
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      active: false
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      active: false
    }
  ];

  const renderMenuItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const paddingLeft = level === 0 ? 'pl-3' : 'pl-8';

    return (
      <div key={item.id}>
        <a
          href="#"
          className={`
            group flex items-center ${paddingLeft} pr-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
            ${item.active 
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
        >
          {Icon && (
            <Icon 
              className={`
                flex-shrink-0 h-5 w-5 mr-3
                ${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}
              `}
            />
          )}
          
          {!isCollapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              
              {item.count !== null && (
                <Badge 
                  variant={item.active ? 'primary' : 'default'}
                  size="small"
                >
                  {item.count}
                </Badge>
              )}
              
              {hasChildren && (
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
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
    <div className={`bg-white border-r border-gray-200 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${className}`}>
      {/* Sidebar header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">API Hub</span>
          </div>
        )}
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
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