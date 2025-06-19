import { useState, useCallback, useEffect } from 'react';
import { apiService } from '../services/api';
import { SIMILARITY_CATEGORIES } from '../utils/constants';

/**
 * Custom hook for managing API duplicates data and operations
 */
export const useApiDuplicates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastScanTime, setLastScanTime] = useState(null);

  // Calculate statistics from the data
  const getStatistics = useCallback((duplicatesData) => {
    if (!duplicatesData) return null;

    let totalDuplicates = 0;
    let highSimilarity = 0;
    let mediumSimilarity = 0;
    let lowSimilarity = 0;

    // Process all categories
    Object.values(duplicatesData).forEach(categoryGroups => {
      categoryGroups.forEach(group => {
        const score = group.similarity_score_percentage;
        const pairCount = group.pairs?.length || 0;
        
        totalDuplicates += pairCount;
        
        if (score >= SIMILARITY_CATEGORIES.HIGH.threshold) {
          highSimilarity += pairCount;
        } else if (score >= SIMILARITY_CATEGORIES.MEDIUM.threshold) {
          mediumSimilarity += pairCount;
        } else if (score >= SIMILARITY_CATEGORIES.LOW.threshold) {
          lowSimilarity += pairCount;
        }
      });
    });

    return {
      totalDuplicates,
      highSimilarity,
      mediumSimilarity,
      lowSimilarity
    };
  }, []);

  // Get category breakdown for charts
  const getCategoryBreakdown = useCallback((duplicatesData) => {
    if (!duplicatesData) return [];

    const categoryStats = {};

    Object.entries(duplicatesData).forEach(([category, groups]) => {
      if (category === 'All Categories') return;
      
      const totalPairs = groups.reduce((sum, group) => sum + (group.pairs?.length || 0), 0);
      if (totalPairs > 0) {
        categoryStats[category] = totalPairs;
      }
    });

    return Object.entries(categoryStats).map(([category, count]) => ({
      category,
      count
    }));
  }, []);

  // Scan for duplicates
  const scanDuplicates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[Hook] Starting API duplicates scan...');
      const result = await apiService.scanApiDuplicates();
      
      setData(result);
      setLastScanTime(new Date());
      
      console.log('[Hook] Scan completed successfully:', {
        categories: Object.keys(result).length,
        totalGroups: Object.values(result).reduce((sum, groups) => sum + groups.length, 0)
      });
      
      return result;
    } catch (err) {
      console.error('[Hook] Scan failed:', err);
      setError(err.message || 'Failed to scan for duplicates');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh data (alias for scanDuplicates for clarity)
  const refreshData = useCallback(() => {
    return scanDuplicates();
  }, [scanDuplicates]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset all state
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLastScanTime(null);
  }, []);

  // Auto-refresh on mount (optional)
  useEffect(() => {
    // Uncomment if you want to auto-load data on component mount
    // scanDuplicates();
  }, []);

  // Computed values
  const statistics = getStatistics(data);
  const categoryBreakdown = getCategoryBreakdown(data);
  const hasData = data && Object.keys(data).length > 0;
  const categories = hasData ? Object.keys(data) : [];

  return {
    // State
    data,
    loading,
    error,
    lastScanTime,
    
    // Computed values
    statistics,
    categoryBreakdown,
    hasData,
    categories,
    
    // Actions
    scanDuplicates,
    refreshData,
    clearError,
    reset
  };
};

export default useApiDuplicates;