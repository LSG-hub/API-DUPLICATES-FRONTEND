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
  // Combine classes
  const badgeClasses = [
    'badge',
    variant ? `badge-${variant}` : '',
    size !== 'medium' ? `badge-${size}` : '',
    className
  ].filter(Boolean).join(' ');

  // Custom color override
  const customColorStyles = color ? {
    backgroundColor: `${color}20`,
    color: color
  } : {};

  return (
    <span
      className={badgeClasses}
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