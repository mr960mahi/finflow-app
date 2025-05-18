/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a date in a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Returns the relative time from now (e.g., "2 days ago", "in 3 days")
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Tomorrow';
  if (diffInDays === -1) return 'Yesterday';
  if (diffInDays > 0) return `In ${diffInDays} days`;
  return `${Math.abs(diffInDays)} days ago`;
};

/**
 * Calculates the percentage of a value against a total
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * Truncates text to a specific length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Gets a color class based on a percentage value
 * Used for progress indicators
 */
export const getProgressColorClass = (percentage: number): string => {
  if (percentage < 50) return 'text-success-500';
  if (percentage < 80) return 'text-warning-500';
  return 'text-warning-600';
};

/**
 * Format a number with appropriate suffix (K, M, B)
 */
export const formatCompactNumber = (num: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(num);
};