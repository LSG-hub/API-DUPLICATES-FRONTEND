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
  // Size styles
  const sizeStyles = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  // Color styles
  const colorStyles = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
    green: 'text-green-600',
    red: 'text-red-600'
  };

  const spinnerStyles = `
    animate-spin
    ${sizeStyles[size]}
    ${colorStyles[color]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const Spinner = () => (
    <svg
      className={spinnerStyles}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
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
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
          <Spinner />
          {message && (
            <p className="text-gray-700 text-center font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <Spinner />
        <p className="text-gray-600 text-sm font-medium">
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
    className={`inline ${className}`} 
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
  <div className={`flex items-center justify-center p-8 ${className}`}>
    <LoadingSpinner size="medium" message="Loading..." {...props} />
  </div>
);

export default LoadingSpinner;