/**
 * Format a permission name into a more readable format
 * Example: 'view_users' -> 'View Users'
 */
export function formatPermissionName(permission: string): string {
  return permission
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if the current user has all the required permissions
 */
export function hasPermissions(
  user: { permissions?: Array<{ name: string }>; roles?: Array<{ permissions: Array<{ name: string }> }> },
  ...permissions: string[]
): boolean {
  if (!user) return false;
  
  // Check direct permissions
  const userPermissions = new Set(
    [
      ...(user.permissions?.map(p => p.name) || []),
      ...(user.roles?.flatMap(role => role.permissions.map(p => p.name)) || [])
    ]
  );

  return permissions.every(permission => userPermissions.has(permission));
}

/**
 * Check if the current user has any of the required permissions
 */
export function hasAnyPermission(
  user: { permissions?: Array<{ name: string }>; roles?: Array<{ permissions: Array<{ name: string }> }> },
  ...permissions: string[]
): boolean {
  if (!user) return false;
  
  // Check direct permissions
  const userPermissions = new Set(
    [
      ...(user.permissions?.map(p => p.name) || []),
      ...(user.roles?.flatMap(role => role.permissions.map(p => p.name)) || [])
    ]
  );

  return permissions.some(permission => userPermissions.has(permission));
}

/**
 * Check if the current user has a specific role
 */
export function hasRole(
  user: { roles?: Array<{ name: string }> },
  ...roles: string[]
): boolean {
  if (!user || !user.roles) return false;
  return user.roles.some(role => roles.includes(role.name));
}

/**
 * Format date to a readable format
 */
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format file size to a human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Generate a unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Convert a string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert a string to Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, char => char.toUpperCase())
    .trim();
}

/**
 * Generate a random color
 */
export function getRandomColor(alpha = 1): string {
  const r = Math.floor(Math.random() * 200) + 55; // 55-255 for better visibility
  const g = Math.floor(Math.random() * 200) + 55;
  const b = Math.floor(Math.random() * 200) + 55;
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
