import React from 'react';

/**
 * Loading spinner component with various sizes and overlay options
 */
const LoadingSpinner = ({
  size = 'medium',
  color = 'blue',
  overlay = false,
  message = '',
  className = '',
  ...props
}) => {
  // Combine classes
  const spinnerClasses = [
    'spinner',
    `spinner-${size}`,
    `spinner-${color}`,
    className
  ].filter(Boolean).join(' ');

  const Spinner = () => (
    <svg
      className={spinnerClasses}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="spinner-track"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="spinner-fill"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (overlay) {
    return (
      <div className="spinner-overlay">
        <div className="spinner-overlay-content">
          <Spinner />
          {message && (
            <p className="spinner-message">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="spinner-with-message">
        <Spinner />
        <p className="spinner-message-inline">
          {message}
        </p>
      </div>
    );
  }

  return <Spinner />;
};

/**
 * Inline loading state for buttons or small components
 */
export const InlineSpinner = ({ className = '', ...props }) => (
  <LoadingSpinner 
    size="small" 
    className={`spinner-inline ${className}`} 
    {...props} 
  />
);

/**
 * Full page loading overlay
 */
export const FullPageLoader = ({ message = 'Loading...', ...props }) => (
  <LoadingSpinner 
    overlay={true} 
    size="large" 
    message={message} 
    {...props} 
  />
);

/**
 * Card loading placeholder
 */
export const CardLoader = ({ className = '', ...props }) => (
  <div className={`spinner-card ${className}`}>
    <LoadingSpinner size="medium" message="Loading..." {...props} />
  </div>
);

export default LoadingSpinner;