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
    <div className={`category-tabs-container ${className}`}>
      <nav className="category-tabs-nav" aria-label="Category filter">
        {sortedCategories.map((category) => {
          const isActive = activeCategory === category;
          const count = getCategoryCount(category);
          const color = getCategoryColor(category);
          
          const tabClasses = [
            'category-tab',
            isActive ? 'category-tab-active' : ''
          ].filter(Boolean).join(' ');
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange?.(category)}
              className={tabClasses}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="category-tab-content">
                {/* Category color indicator */}
                <div 
                  className="category-color-indicator"
                  style={{ backgroundColor: color }}
                />
                
                {/* Category name */}
                <span className="category-name">
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
                  className="category-active-indicator"
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
    <div className={`category-filter card ${className}`}>
      {/* Search bar */}
      <div className="category-filter-search">
        <div className="search-container">
          <div className="search-icon">
            <svg className="search-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search duplicate APIs..."
            className="search-input"
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
      <div className="category-filter-summary">
        <div className="filter-summary-content">
          <div className="filter-summary-text">
            {activeCategory === 'All Categories' ? (
              <>Showing all categories</>
            ) : (
              <>Filtered by: <span className="filter-summary-highlight">{activeCategory}</span></>
            )}
            {searchTerm && (
              <> • Search: <span className="filter-summary-highlight">"{searchTerm}"</span></>
            )}
          </div>
          
          <div className="filter-summary-count">
            {categoryStats[activeCategory] || Object.values(categoryStats).reduce((sum, count) => sum + count, 0)} 
            {' '}duplicate pairs
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;