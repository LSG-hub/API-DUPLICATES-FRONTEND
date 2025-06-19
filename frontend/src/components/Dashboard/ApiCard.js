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
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Header with API name and similarity score */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            ID: {contract_id.split('/').pop()?.replace('.json', '') || 'Unknown'}
          </p>
        </div>
        
        {similarityScore !== null && (
          <div className="ml-3">
            <SimilarityBadge score={similarityScore} />
          </div>
        )}
      </div>

      {/* API Version */}
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-xs text-gray-500">Version:</span>
        <Badge variant="outline" size="small">
          {version}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {truncateText(description)}
      </p>

      {/* Category and OpenAPI version */}
      <div className="flex items-center justify-between mb-3">
        <Badge 
          color={getCategoryColor(category)}
          size="small"
        >
          {category}
        </Badge>
        
        <VersionBadge version={openapi_version} />
      </div>

      {/* Status badge (assuming active for now) */}
      <div className="flex items-center justify-between">
        <StatusBadge status="active" />
        
        {/* How is this API similar button */}
        {explanationText && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => onViewDetails?.(api, explanationText)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              How is this API similar?
              <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Tooltip */}
            {showTooltip && explanationText && (
              <div className="absolute bottom-full right-0 mb-2 w-80 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                <div className="max-h-32 overflow-y-auto">
                  {explanationText.split('\n').map((line, index) => (
                    <p key={index} className="mb-1 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewDetails?.(api, explanationText)}
            className="flex-1 text-xs text-gray-600 hover:text-gray-800 font-medium py-1 px-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          
          {type === 'destination' && similarityScore >= 85 && (
            <button className="flex-1 text-xs text-blue-600 hover:text-blue-800 font-medium py-1 px-2 rounded border border-blue-300 hover:bg-blue-50 transition-colors">
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
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      {/* Pair header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-900">
          API Similarity Pair
        </h4>
        <SimilarityBadge score={similarityScore} />
      </div>

      {/* API cards in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Source API</div>
          <ApiCard 
            api={source}
            type="source"
            explanationText={similarity_full_explanation_text}
            onViewDetails={onViewDetails}
          />
        </div>
        
        <div>
          <div className="text-xs font-medium text-gray-700 mb-2">Similar API Found</div>
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
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onTakeAction?.(pair, 'mark_duplicate')}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Mark as Duplicate
            </button>
            <button
              onClick={() => onTakeAction?.(pair, 'false_positive')}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded transition-colors"
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