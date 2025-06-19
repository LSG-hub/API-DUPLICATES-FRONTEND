import React, { useState } from 'react';

/**
 * LookerStudio component for embedding the analytics dashboard
 */
const LookerStudio = ({ className = '', height = '600px' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Looker Studio URL from your constants
  const LOOKER_STUDIO_URL = "https://lookerstudio.google.com/embed/reporting/1395c73f-e27d-44db-99a4-88e1344147e8/page/H7sNF";

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const refreshIframe = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe reload by updating its key
    const iframe = document.querySelector('#looker-iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className={`relative card ${className}`}>
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
            onClick={refreshIframe}
            className="btn btn-outline btn-small"
          >
            <svg 
              className="h-4 w-4 mr-2" 
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
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
            <div className="flex flex-col items-center space-y-4">
              <svg
                className="animate-spin h-12 w-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-gray-600 text-sm font-medium">
                Loading Looker Studio dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Dashboard Unavailable
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Unable to load the Looker Studio dashboard.
              </p>
              <button
                onClick={refreshIframe}
                className="btn btn-primary btn-small"
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
      <div className="border-t border-gray-200 px-6 py-3 bg-gray-50" style={{ borderRadius: '0 0 0.5rem 0.5rem' }}>
        <p className="text-xs text-gray-500">
          Powered by Google Looker Studio • Data updates in real-time
        </p>
      </div>
    </div>
  );
};

export default LookerStudio;