import React from 'react';
import Badge from '../UI/Badge';
import { CATEGORY_COLORS } from '../../utils/constants';

/**
 * CategoryTabs component for filtering duplicate APIs by category
 */
const CategoryTabs = ({ 
  categories = [], 
  activeCategory = 'All Categories',
  onCategoryChange,
  categoryStats = {},
  className = '' 
}) => {
  if (!categories || categories.length === 0) return null;

  // Ensure "All Categories" is first
  const sortedCategories = ['All Categories', ...categories.filter(cat => cat !== 'All Categories')];

  // Get category count
  const getCategoryCount = (category) => {
    if (category === 'All Categories') {
      return Object.values(categoryStats).reduce((sum, count) => sum + count, 0);
    }
    return categoryStats[category] || 0;
  };

  // Get category color
  const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS['All Categories'];
  };

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-1 overflow-x-auto" aria-label="Category filter">
        {sortedCategories.map((category) => {
          const isActive = activeCategory === category;
          const count = getCategoryCount(category);
          const color = getCategoryColor(category);
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange?.(category)}
              className={`
                group relative min-w-0 flex-1 overflow-hidden py-3 px-4 text-sm font-medium text-center
                hover:text-gray-700 focus:z-10 focus:outline-none transition-colors duration-200
                ${isActive 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="flex items-center justify-center space-x-2">
                {/* Category color indicator */}
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                
                {/* Category name */}
                <span className="truncate">
                  {category}
                </span>
                
                {/* Count badge */}
                {count > 0 && (
                  <Badge 
                    variant={isActive ? 'primary' : 'default'}
                    size="small"
                  >
                    {count}
                  </Badge>
                )}
              </div>

              {/* Active indicator line */}
              {isActive && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: color }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

/**
 * CategoryFilter component with search and advanced filters
 */
export const CategoryFilter = ({ 
  categories = [],
  activeCategory = 'All Categories',
  onCategoryChange,
  categoryStats = {},
  searchTerm = '',
  onSearchChange,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search duplicate APIs..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        categoryStats={categoryStats}
      />

      {/* Filter summary */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            {activeCategory === 'All Categories' ? (
              <>Showing all categories</>
            ) : (
              <>Filtered by: <span className="font-medium text-gray-900">{activeCategory}</span></>
            )}
            {searchTerm && (
              <> • Search: <span className="font-medium text-gray-900">"{searchTerm}"</span></>
            )}
          </div>
          
          <div className="text-gray-500">
            {categoryStats[activeCategory] || Object.values(categoryStats).reduce((sum, count) => sum + count, 0)} 
            {' '}duplicate pairs
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;