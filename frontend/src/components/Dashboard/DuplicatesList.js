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
      <div className={`duplicates-list-error card ${className}`}>
        <div className="duplicates-list-error-content">
          <div className="duplicates-list-error-center">
            <div className="duplicates-list-error-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="duplicates-list-error-title">
              Failed to Load Duplicates
            </h3>
            <p className="duplicates-list-error-message">
              {error}
            </p>
            <div className="duplicates-list-error-actions">
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
    <div className={`duplicates-list card ${className}`}>
      {/* Header */}
      <div className="duplicates-list-header">
        <div className="duplicates-list-header-content">
          <div>
            <h2 className="duplicates-list-title">
              Duplicate APIs Detection
            </h2>
            <p className="duplicates-list-subtitle">
              Identify and manage duplicate APIs across your estate
            </p>
          </div>
          
          <div className="duplicates-list-header-actions">
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
        <div className="duplicates-list-analytics">
          <div className="duplicates-list-analytics-header">
            <h3 className="duplicates-list-analytics-title">Analytics Overview</h3>
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
          
          <div className="duplicates-list-stats-grid">
            <div className="duplicates-list-stat-card duplicates-list-stat-card-total">
              <div className="duplicates-list-stat-content">
                <div className="duplicates-list-stat-text">
                  <p className="duplicates-list-stat-label">Total Duplicate APIs</p>
                  <p className="duplicates-list-stat-value">{statistics.totalDuplicates}</p>
                  <p className="duplicates-list-stat-description">Across all categories</p>
                </div>
                <div className="duplicates-list-stat-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="duplicates-list-stat-card duplicates-list-stat-card-high">
              <div className="duplicates-list-stat-content">
                <div className="duplicates-list-stat-text">
                  <p className="duplicates-list-stat-label">High Similarity</p>
                  <p className="duplicates-list-stat-value">{statistics.highSimilarity}</p>
                  <p className="duplicates-list-stat-description">≥95% match</p>
                </div>
                <div className="duplicates-list-stat-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="duplicates-list-stat-card duplicates-list-stat-card-medium">
              <div className="duplicates-list-stat-content">
                <div className="duplicates-list-stat-text">
                  <p className="duplicates-list-stat-label">Medium Similarity</p>
                  <p className="duplicates-list-stat-value">{statistics.mediumSimilarity}</p>
                  <p className="duplicates-list-stat-description">85–94% match</p>
                </div>
                <div className="duplicates-list-stat-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="duplicates-list-stat-card duplicates-list-stat-card-low">
              <div className="duplicates-list-stat-content">
                <div className="duplicates-list-stat-text">
                  <p className="duplicates-list-stat-label">Low Similarity</p>
                  <p className="duplicates-list-stat-value">{statistics.lowSimilarity}</p>
                  <p className="duplicates-list-stat-description">Below 85% match</p>
                </div>
                <div className="duplicates-list-stat-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
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
        <div className="duplicates-list-ai-status">
          <div className="duplicates-list-ai-status-content">
            <div className="duplicates-list-ai-status-left">
              <div className="duplicates-list-ai-indicator"></div>
              <span className="duplicates-list-ai-status-title">
                AI Affinity Active
              </span>
              <span className="duplicates-list-ai-status-description">
                Enhanced duplicate detection with 50% confidence threshold
              </span>
            </div>
            <span className="badge badge-primary">AI Enhanced</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="duplicates-list-content">
        {loading && !hasData ? (
          <div className="duplicates-list-loading">
            <svg className="duplicates-list-loading-spinner" fill="none" viewBox="0 0 24 24">
              <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="duplicates-list-loading-text">Scanning for API duplicates using AI...</p>
          </div>
        ) : hasData ? (
          <div className="duplicates-list-data">
            {/* Sample duplicate groups */}
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((group, index) => (
                <div key={index} className="duplicates-list-group">
                  <div className="duplicates-list-group-content">
                    <div className="duplicates-list-group-header">
                      <div className="duplicates-list-group-header-left">
                        <svg className="duplicates-list-group-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <div>
                          <h3 className="duplicates-list-group-title">
                            {group.similarity_score_percentage}% Match
                          </h3>
                          <p className="duplicates-list-group-subtitle">
                            {group.pairs?.length || 0} API pair{(group.pairs?.length || 0) !== 1 ? 's' : ''} • {group.number_of_apis || (group.pairs?.length || 0) * 2} total APIs
                          </p>
                        </div>
                      </div>
                      <div className="duplicates-list-group-header-right">
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
              <div className="duplicates-list-no-results">
                <p className="duplicates-list-no-results-text">No duplicate groups found for the selected category.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="duplicates-list-empty">
            <div className="duplicates-list-empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="duplicates-list-empty-title">
              No scan performed yet
            </h3>
            <p className="duplicates-list-empty-description">
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