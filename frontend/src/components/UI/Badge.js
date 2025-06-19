
import React from 'react';

/**
 * Badge component for displaying similarity scores, statuses, and categories
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  color = null,
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
    high: 'bg-red-100 text-red-800',
    medium: 'bg-orange-100 text-orange-800',
    low: 'bg-yellow-100 text-yellow-800',
    none: 'bg-gray-100 text-gray-600'
  };

  // Size styles
  const sizeStyles = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-sm',
    large: 'px-3 py-1.5 text-base'
  };

  // Custom color override
  const customColorStyles = color ? {
    backgroundColor: `${color}20`,
    color: color
  } : {};

  // Combine styles
  const badgeStyles = `
    ${baseStyles}
    ${color ? '' : variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span
      className={badgeStyles}
      style={customColorStyles}
      {...props}
    >
      {children}
    </span>
  );
};

/**
 * Specialized badge for similarity scores
 */
export const SimilarityBadge = ({ score, className = '', ...props }) => {
  let variant = 'none';
  let text = `${score}% match`;

  if (score >= 95) {
    variant = 'high';
  } else if (score >= 85) {
    variant = 'medium';
  } else if (score >= 50) {
    variant = 'low';
  }

  return (
    <Badge variant={variant} className={className} {...props}>
      {text}
    </Badge>
  );
};

/**
 * Specialized badge for API status
 */
export const StatusBadge = ({ status, className = '', ...props }) => {
  const statusConfig = {
    active: { variant: 'success', text: 'Active' },
    inactive: { variant: 'danger', text: 'Inactive' },
    pending: { variant: 'warning', text: 'Pending' },
    deprecated: { variant: 'danger', text: 'Deprecated' }
  };

  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

  return (
    <Badge variant={config.variant} size="small" className={className} {...props}>
      {config.text}
    </Badge>
  );
};

/**
 * Specialized badge for OpenAPI versions
 */
export const VersionBadge = ({ version, className = '', ...props }) => {
  const isOAS3 = version?.startsWith('3') || version?.toLowerCase().includes('oas3');
  
  return (
    <Badge 
      variant={isOAS3 ? 'primary' : 'warning'} 
      size="small" 
      className={className} 
      {...props}
    >
      {version || 'Unknown'}
    </Badge>
  );
};

export default Badge;