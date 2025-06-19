import React, { useState, useMemo } from 'react';
import Button from '../UI/Button';
import { useApiDuplicates } from '../../hooks/useApiDuplicates';

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
    alert(`API Details:\n\nName: ${api.name}\nDescription: ${api.description}\n\nSimilarity Explanation:\n${explanationText}`);
  };

  // Handle taking action on duplicates
  const handleTakeAction = (target, actionType) => {
    console.log('Take action:', actionType, 'on:', target);
    alert(`Action: ${actionType}\nTarget: ${target.similarity_score_percentage || 'group'}`);
  };

  // Handle export
  const handleExport = () => {
    console.log('Export duplicates data');
    alert('Export functionality to be implemented');
  };

  if (error) {
    return (
      <div className={`card ${className}`}>
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-red-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Failed to Load Duplicates
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {error}
            </p>
            <div className="flex items-center justify-center space-x-2">
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
    <div className={`card ${className}`}>
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
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            >
              AI Affinity Settings
            </Button>
            
            {/* AI Scan Now button */}
            <Button
              variant="primary"
              size="medium"
              loading={loading}
              onClick={scanDuplicates}
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                </svg>
              }
            >
              AI Scan Now
            </Button>
            
            {/* Export button */}
            {hasData && (
              <Button
                variant="outline"
                size="small"
                onClick={handleExport}
                icon={
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
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
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            >
              Refresh Analytics
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
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
                  <p className="text-2xl font-bold text-orange-800">{statistics.mediumSimilarity}</p>
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
                  <p className="text-2xl font-bold text-yellow-800">{statistics.lowSimilarity}</p>
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
            <span className="badge badge-primary">AI Enhanced</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {loading && !hasData ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 font-medium">Scanning for API duplicates using AI...</p>
          </div>
        ) : hasData ? (
          <div className="space-y-4">
            {/* Sample duplicate groups */}
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((group, index) => (
                <div key={index} className="bg-red-50 border-red-200 border rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {group.similarity_score_percentage}% Match
                          </h3>
                          <p className="text-sm text-gray-600">
                            {group.pairs?.length || 0} API pair{(group.pairs?.length || 0) !== 1 ? 's' : ''} • {group.number_of_apis || (group.pairs?.length || 0) * 2} total APIs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${group.similarity_score_percentage >= 95 ? 'badge-danger' : group.similarity_score_percentage >= 85 ? 'badge-medium' : 'badge-low'}`}>
                          {group.similarity_score_percentage >= 95 ? 'HIGH' : group.similarity_score_percentage >= 85 ? 'MEDIUM' : 'LOW'} Priority
                        </span>
                        {group.similarity_score_percentage >= 95 && (
                          <Button variant="outline" size="small" onClick={() => handleTakeAction(group, 'bulk_action')}>
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No duplicate groups found for the selected category.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              No scan performed yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Click "AI Scan Now" to detect duplicate APIs using AI analysis.
            </p>
            <Button
              variant="primary"
              onClick={scanDuplicates}
              loading={loading}
              icon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                </svg>
              }
            >
              Start AI Scan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuplicatesList;