import React, { useState } from 'react';
import { ApiPairCard } from './ApiCard';
import Badge from '../UI/Badge';
import Button from '../UI/Button';

/**
 * SimilarityGroup component for displaying groups of APIs with similar similarity scores
 */
const SimilarityGroup = ({ 
  group, 
  onViewDetails,
  onTakeAction,
  defaultExpanded = false,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!group || !group.pairs || group.pairs.length === 0) return null;

  const {
    similarity_score_percentage = 0,
    number_of_apis = 0,
    pairs = []
  } = group;

  // Get priority level based on score
  const getPriorityLevel = (score) => {
    if (score >= 95) return { level: 'HIGH', color: 'danger', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    if (score >= 85) return { level: 'MEDIUM', color: 'warning', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
    if (score >= 50) return { level: 'LOW', color: 'info', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    return { level: 'NONE', color: 'default', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' };
  };

  const priority = getPriorityLevel(similarity_score_percentage);
  const pairCount = pairs.length;
  const apiCount = number_of_apis || (pairCount * 2); // Fallback calculation

  return (
    <div className={`${priority.bgColor} ${priority.borderColor} border rounded-lg ${className}`}>
      {/* Group header */}
      <div 
        className="p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Expand/collapse icon */}
            <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded">
              <svg 
                className={`h-5 w-5 text-gray-600 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Group title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {similarity_score_percentage}% Match
              </h3>
              <p className="text-sm text-gray-600">
                {pairCount} API pair{pairCount !== 1 ? 's' : ''} • {apiCount} total APIs
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Priority badge */}
            <Badge variant={priority.color}>
              {priority.level} Priority
            </Badge>

            {/* Action button for high priority */}
            {priority.level === 'HIGH' && (
              <Button 
                size="small"
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onTakeAction?.(group, 'bulk_action');
                }}
              >
                Take Action
              </Button>
            )}
          </div>
        </div>

        {/* Quick stats */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-current border-opacity-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Similarity Level:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {priority.level} ({similarity_score_percentage}%)
                </span>
              </div>
              <div>
                <span className="text-gray-600">API Pairs:</span>
                <span className="ml-2 font-medium text-gray-900">{pairCount}</span>
              </div>
              <div>
                <span className="text-gray-600">Total APIs:</span>
                <span className="ml-2 font-medium text-gray-900">{apiCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Group content */}
      {isExpanded && (
        <div className="border-t border-current border-opacity-20">
          <div className="p-4">
            {/* Bulk actions for high priority groups */}
            {priority.level === 'HIGH' && (
              <div className="mb-4 p-3 bg-white bg-opacity-60 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      High Priority Duplicates Detected
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      These APIs have very high similarity. Consider immediate action.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="small"
                      variant="outline"
                      onClick={() => onTakeAction?.(group, 'mark_all_false_positive')}
                    >
                      Mark All False Positive
                    </Button>
                    <Button 
                      size="small"
                      variant="danger"
                      onClick={() => onTakeAction?.(group, 'mark_all_duplicate')}
                    >
                      Mark All Duplicate
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* API pairs grid */}
            <div className="space-y-4">
              {pairs.map((pair, index) => (
                <ApiPairCard
                  key={`${pair.source?.contract_id}-${pair.destination?.contract_id}-${index}`}
                  pair={pair}
                  onViewDetails={onViewDetails}
                  onTakeAction={onTakeAction}
                />
              ))}
            </div>

            {/* Load more if there are many pairs */}
            {pairs.length > 5 && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  size="small"
                  onClick={() => {
                    // Implement pagination or "show more" logic
                    console.log('Load more pairs for group:', similarity_score_percentage);
                  }}
                >
                  Show More Pairs ({pairs.length - 5} remaining)
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * SimilarityGroupsList component for displaying multiple similarity groups
 */
export const SimilarityGroupsList = ({ 
  groups = [], 
  onViewDetails,
  onTakeAction,
  className = '' 
}) => {
  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No duplicate groups found</h3>
        <p className="mt-1 text-sm text-gray-500">
          No APIs with significant similarity were detected.
        </p>
      </div>
    );
  }

  // Sort groups by similarity score (highest first)
  const sortedGroups = [...groups].sort((a, b) => 
    (b.similarity_score_percentage || 0) - (a.similarity_score_percentage || 0)
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {sortedGroups.map((group, index) => (
        <SimilarityGroup
          key={`group-${group.similarity_score_percentage}-${index}`}
          group={group}
          onViewDetails={onViewDetails}
          onTakeAction={onTakeAction}
          defaultExpanded={index === 0 || group.similarity_score_percentage >= 95}
        />
      ))}
    </div>
  );
};

export default SimilarityGroup;