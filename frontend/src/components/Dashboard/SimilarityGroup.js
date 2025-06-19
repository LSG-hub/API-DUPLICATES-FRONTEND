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
    if (score >= 95) return { level: 'HIGH', variant: 'danger', bgClass: 'similarity-group-high', borderClass: 'similarity-group-border-high' };
    if (score >= 85) return { level: 'MEDIUM', variant: 'warning', bgClass: 'similarity-group-medium', borderClass: 'similarity-group-border-medium' };
    if (score >= 50) return { level: 'LOW', variant: 'info', bgClass: 'similarity-group-low', borderClass: 'similarity-group-border-low' };
    return { level: 'NONE', variant: 'default', bgClass: 'similarity-group-none', borderClass: 'similarity-group-border-none' };
  };

  const priority = getPriorityLevel(similarity_score_percentage);
  const pairCount = pairs.length;
  const apiCount = number_of_apis || (pairCount * 2); // Fallback calculation

  const groupClasses = [
    'similarity-group',
    priority.bgClass,
    priority.borderClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      {/* Group header */}
      <div 
        className="similarity-group-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="similarity-group-header-content">
          <div className="similarity-group-header-left">
            {/* Expand/collapse icon */}
            <button className="similarity-group-toggle">
              <svg 
                className={`similarity-group-toggle-icon ${isExpanded ? 'similarity-group-toggle-expanded' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Group title */}
            <div>
              <h3 className="similarity-group-title">
                {similarity_score_percentage}% Match
              </h3>
              <p className="similarity-group-subtitle">
                {pairCount} API pair{pairCount !== 1 ? 's' : ''} • {apiCount} total APIs
              </p>
            </div>
          </div>

          <div className="similarity-group-header-right">
            {/* Priority badge */}
            <Badge variant={priority.variant}>
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
          <div className="similarity-group-stats">
            <div className="similarity-group-stats-grid">
              <div>
                <span className="similarity-group-stats-label">Similarity Level:</span>
                <span className="similarity-group-stats-value">
                  {priority.level} ({similarity_score_percentage}%)
                </span>
              </div>
              <div>
                <span className="similarity-group-stats-label">API Pairs:</span>
                <span className="similarity-group-stats-value">{pairCount}</span>
              </div>
              <div>
                <span className="similarity-group-stats-label">Total APIs:</span>
                <span className="similarity-group-stats-value">{apiCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Group content */}
      {isExpanded && (
        <div className="similarity-group-content">
          <div className="similarity-group-content-inner">
            {/* Bulk actions for high priority groups */}
            {priority.level === 'HIGH' && (
              <div className="similarity-group-bulk-actions">
                <div className="similarity-group-bulk-actions-content">
                  <div>
                    <h4 className="similarity-group-bulk-title">
                      High Priority Duplicates Detected
                    </h4>
                    <p className="similarity-group-bulk-subtitle">
                      These APIs have very high similarity. Consider immediate action.
                    </p>
                  </div>
                  <div className="similarity-group-bulk-buttons">
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
            <div className="similarity-group-pairs">
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
              <div className="similarity-group-load-more">
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
      <div className="similarity-groups-empty">
        <div className="similarity-groups-empty-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="similarity-groups-empty-title">No duplicate groups found</h3>
        <p className="similarity-groups-empty-description">
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
    <div className={`similarity-groups-list ${className}`}>
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