import React, { useState } from 'react';
import Badge, { SimilarityBadge, StatusBadge, VersionBadge } from '../UI/Badge';

/**
 * ApiCard component for displaying individual API information in duplicate pairs
 */
const ApiCard = ({ 
  api, 
  type = 'source', // 'source' or 'destination'
  similarityScore = null,
  explanationText = '',
  onViewDetails,
  className = '' 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!api) return null;

  const {
    name = 'Unknown API',
    version = 'Unknown',
    description = 'No description available',
    category = 'Uncategorized',
    openapi_version = 'Unknown',
    contract_id = ''
  } = api;

  // Truncate long text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Authentication': '#3b82f6',
      'User Management': '#8b5cf6',
      'Payment': '#10b981',
      'Testing': '#f59e0b',
      'Content Management': '#ef4444',
      'Order Management': '#06b6d4'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div className={`api-card ${className}`}>
      {/* Header with API name and similarity score */}
      <div className="api-card-header">
        <div className="api-card-title-section">
          <h3 className="api-card-title">
            {name}
          </h3>
          <p className="api-card-id">
            ID: {contract_id.split('/').pop()?.replace('.json', '') || 'Unknown'}
          </p>
        </div>
        
        {similarityScore !== null && (
          <div className="api-card-score">
            <SimilarityBadge score={similarityScore} />
          </div>
        )}
      </div>

      {/* API Version */}
      <div className="api-card-version">
        <span className="api-card-version-label">Version:</span>
        <Badge variant="outline" size="small">
          {version}
        </Badge>
      </div>

      {/* Description */}
      <p className="api-card-description">
        {truncateText(description)}
      </p>

      {/* Category and OpenAPI version */}
      <div className="api-card-meta">
        <Badge 
          color={getCategoryColor(category)}
          size="small"
        >
          {category}
        </Badge>
        
        <VersionBadge version={openapi_version} />
      </div>

      {/* Status badge (assuming active for now) */}
      <div className="api-card-status-row">
        <StatusBadge status="active" />
        
        {/* How is this API similar button */}
        {explanationText && (
          <div className="api-card-tooltip-container">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => onViewDetails?.(api, explanationText)}
              className="api-card-similarity-btn"
            >
              How is this API similar?
              <svg className="api-card-question-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Tooltip */}
            {showTooltip && explanationText && (
              <div className="api-card-tooltip">
                <div className="api-card-tooltip-content">
                  {explanationText.split('\n').map((line, index) => (
                    <p key={index} className="api-card-tooltip-line">
                      {line}
                    </p>
                  ))}
                </div>
                {/* Tooltip arrow */}
                <div className="api-card-tooltip-arrow"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="api-card-actions">
        <div className="api-card-actions-content">
          <button
            onClick={() => onViewDetails?.(api, explanationText)}
            className="api-card-action-btn api-card-action-btn-outline"
          >
            View Details
          </button>
          
          {type === 'destination' && similarityScore >= 85 && (
            <button className="api-card-action-btn api-card-action-btn-primary">
              Take Action
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ApiPairCard component for displaying source-destination API pairs
 */
export const ApiPairCard = ({ 
  pair, 
  onViewDetails,
  onTakeAction,
  className = '' 
}) => {
  if (!pair || !pair.source || !pair.destination) return null;

  const { source, destination, similarity_full_explanation_text } = pair;
  
  // Calculate similarity score from the explanation or assume it's in the data
  const similarityScore = pair.similarity_score || 
    parseInt(similarity_full_explanation_text?.match(/(\d+)%/)?.[1]) || 
    0;

  return (
    <div className={`api-pair-card ${className}`}>
      {/* Pair header */}
      <div className="api-pair-header">
        <h4 className="api-pair-title">
          API Similarity Pair
        </h4>
        <SimilarityBadge score={similarityScore} />
      </div>

      {/* API cards in grid */}
      <div className="api-pair-grid">
        <div>
          <div className="api-pair-label">Source API</div>
          <ApiCard 
            api={source}
            type="source"
            explanationText={similarity_full_explanation_text}
            onViewDetails={onViewDetails}
          />
        </div>
        
        <div>
          <div className="api-pair-label">Similar API Found</div>
          <ApiCard 
            api={destination}
            type="destination"
            similarityScore={similarityScore}
            explanationText={similarity_full_explanation_text}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>

      {/* Action buttons for the pair */}
      {similarityScore >= 85 && (
        <div className="api-pair-actions">
          <div className="api-pair-actions-content">
            <button
              onClick={() => onTakeAction?.(pair, 'mark_duplicate')}
              className="btn btn-primary btn-small"
            >
              Mark as Duplicate
            </button>
            <button
              onClick={() => onTakeAction?.(pair, 'false_positive')}
              className="btn btn-outline btn-small"
            >
              Mark as False Positive
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiCard;