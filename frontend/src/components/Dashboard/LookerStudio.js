import React, { useState } from 'react';
import { LOOKER_STUDIO_URL } from '../../utils/constants';
import LoadingSpinner from '../UI/LoadingSpinner';

/**
 * LookerStudio component for embedding the analytics dashboard
 */
const LookerStudio = ({ className = '', height = '600px' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Analytics Overview
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time insights from Looker Studio dashboard
            </p>
          </div>
          
          {/* Refresh button for iframe */}
          <button
            onClick={() => {
              setIsLoading(true);
              setHasError(false);
              // Force iframe reload by updating its key
              const iframe = document.querySelector('#looker-iframe');
              if (iframe) {
                iframe.src = iframe.src;
              }
            }}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg 
              className="h-4 w-4 mr-1.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative" style={{ height }}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-b-lg">
            <LoadingSpinner 
              size="large" 
              message="Loading Looker Studio dashboard..." 
            />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-b-lg">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Dashboard Unavailable
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Unable to load the Looker Studio dashboard.
              </p>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setHasError(false);
                  const iframe = document.querySelector('#looker-iframe');
                  if (iframe) {
                    iframe.src = iframe.src;
                  }
                }}
                className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Looker Studio iframe */}
        <iframe
          id="looker-iframe"
          src={LOOKER_STUDIO_URL}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ 
            border: 0,
            borderRadius: '0 0 0.5rem 0.5rem'
          }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          onLoad={handleLoad}
          onError={handleError}
          title="API Duplicates Analytics Dashboard"
        />
      </div>

      {/* Footer info */}
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500">
          Powered by Google Looker Studio • Data updates in real-time
        </p>
      </div>
    </div>
  );
};

export default LookerStudio;