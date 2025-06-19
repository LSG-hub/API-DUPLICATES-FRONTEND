import React, { useState, useMemo } from 'react';
import { CategoryFilter } from './CategoryTabs';
import { SimilarityGroupsList } from './SimilarityGroup';
import Button from '../UI/Button';
import Badge from '../UI/Badge';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useApiDuplicates } from '../../hooks/useApiDuplicates';
import { Play, RefreshCw, Download, Settings } from 'lucide-react';

/**
 * DuplicatesList component - the main component for displaying API duplicates
 */
const DuplicatesList = ({ className = '' }) => {
  const {
    data,
    loading,
    error,
    lastScanTime,
    statistics,
    categoryBreakdown,
    hasData,
    categories,
    scanDuplicates,
    clearError
  } = useApiDuplicates();

  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter data based on active category and search term
  const filteredData = useMemo(() => {
    if (!data) return [];

    let categoryData = data[activeCategory] || [];
    
    // If search term is provided, filter across all groups and pairs
    if (searchTerm.trim()) {
      categoryData = categoryData.filter(group => 
        group.pairs?.some(pair => 
          pair.source?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pair.destination?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pair.source?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pair.destination?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pair.source?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pair.destination?.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return categoryData;
  }, [data, activeCategory, searchTerm]);

  // Calculate category stats for tabs
  const categoryStats = useMemo(() => {
    if (!data) return {};
    
    const stats = {};
    Object.entries(data).forEach(([category, groups]) => {
      const totalPairs = groups.reduce((sum, group) => sum + (group.pairs?.length || 0), 0);
      if (totalPairs > 0) {
        stats[category] = totalPairs;
      }
    });
    
    return stats;
  }, [data]);

  // Handle API detail viewing
  const handleViewDetails = (api, explanationText) => {
    console.log('View details for API:', api);
    // TODO: Implement modal or detail view
    alert(`API Details:\n\nName: ${api.name}\nDescription: ${api.description}\n\nSimilarity Explanation:\n${explanationText}`);
  };

  // Handle taking action on duplicates
  const handleTakeAction = (target, actionType) => {
    console.log('Take action:', actionType, 'on:', target);
    // TODO: Implement action handling (mark duplicate, false positive, etc.)
    alert(`Action: ${actionType}\nTarget: ${target.similarity_score_percentage || 'group'}`);
  };

  // Handle export
  const handleExport = () => {
    console.log('Export duplicates data');
    // TODO: Implement export functionality
    alert('Export functionality to be implemented');
  };

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-red-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Failed to Load Duplicates
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {error}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="small"
                onClick={clearError}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={scanDuplicates}
                loading={loading}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Duplicate APIs Detection
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Identify and manage duplicate APIs across your estate
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Settings button */}
            <Button
              variant="outline"
              size="small"
              icon={<Settings className="h-4 w-4" />}
            >
              AI Affinity Settings
            </Button>
            
            {/* AI Scan Now button */}
            <Button
              variant="primary"
              size="medium"
              loading={loading}
              onClick={scanDuplicates}
              icon={<Play className="h-4 w-4" />}
            >
              AI Scan Now
            </Button>
            
            {/* Export button */}
            {hasData && (
              <Button
                variant="outline"
                size="small"
                onClick={handleExport}
                icon={<Download className="h-4 w-4" />}
              >
                Export Report
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      {statistics && (
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-900">Analytics Overview</h3>
            <Button
              variant="outline"
              size="small"
              onClick={scanDuplicates}
              icon={<RefreshCw className="h-4 w-4" />}
            >
              Refresh Analytics
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Duplicate APIs</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalDuplicates}</p>
                  <p className="text-xs text-gray-500 mt-1">Across all categories</p>
                </div>
                <div className="text-gray-400">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-600">High Similarity</p>
                  <p className="text-2xl font-bold text-red-900">{statistics.highSimilarity}</p>
                  <p className="text-xs text-red-500 mt-1">≥95% match</p>
                </div>
                <div className="text-red-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-orange-600">Medium Similarity</p>
                  <p className="text-2xl font-bold text-orange-900">{statistics.mediumSimilarity}</p>
                  <p className="text-xs text-orange-500 mt-1">85–94% match</p>
                </div>
                <div className="text-orange-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-600">Low Similarity</p>
                  <p className="text-2xl font-bold text-yellow-900">{statistics.lowSimilarity}</p>
                  <p className="text-xs text-yellow-500 mt-1">Below 85% match</p>
                </div>
                <div className="text-yellow-400">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Affinity Status */}
      {hasData && (
        <div className="border-b border-gray-200 px-6 py-3 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">
                AI Affinity Active
              </span>
              <span className="text-sm text-blue-600">
                Enhanced duplicate detection with 50% confidence threshold
              </span>
            </div>
            <Badge variant="primary" size="small">
              AI Enhanced
            </Badge>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      {hasData && (
        <div className="p-6 pb-0">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryStats={categoryStats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {loading && !hasData ? (
          <LoadingSpinner 
            size="large" 
            message="Scanning for API duplicates using AI..." 
          />
        ) : hasData ? (
          <>
            {/* View mode toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {filteredData.length} duplicate groups
                  {lastScanTime && (
                    <span className="ml-2">• Last scan: {lastScanTime.toLocaleTimeString()}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Items per page:</span>
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>12</option>
                  <option>24</option>
                  <option>48</option>
                </select>
              </div>
            </div>

            {/* Duplicates list */}
            <SimilarityGroupsList
              groups={filteredData}
              onViewDetails={handleViewDetails}
              onTakeAction={handleTakeAction}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No scan performed yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Click "AI Scan Now" to detect duplicate APIs using AI analysis.
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                onClick={scanDuplicates}
                loading={loading}
                icon={<Play className="h-4 w-4" />}
              >
                Start AI Scan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuplicatesList;