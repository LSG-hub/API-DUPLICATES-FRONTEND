import React from 'react';

/**
 * Reusable Button component with various styles and states
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Combine CSS classes
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    size !== 'medium' ? `btn-${size}` : '',
    disabled || loading ? 'cursor-not-allowed opacity-60' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 mr-2"
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
      )}
      
      {icon && !loading && (
        <span className={children ? 'mr-2' : ''}>
          {icon}
        </span>
      )}
      
      {children}
    </button>
  );
};

export default Button;