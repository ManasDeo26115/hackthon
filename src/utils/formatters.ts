/**
 * Formats a number to Indian Rupee (INR) currency format e.g. ₹1,50,000
 */
export function formatINR(amount: number, hideSymbol: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return hideSymbol ? '0' : '₹0';
  }
  
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('en-IN').format(rounded);
  return hideSymbol ? formatted : `₹${formatted}`;
}

/**
 * Format date string to friendly readable format e.g. "12 Oct 2026"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Format time string e.g. "02:30 PM"
 */
export function formatTime(timeString: string): string {
  if (!timeString) return '';
  try {
    const [hours, minutes] = timeString.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
}

/**
 * Generate a random 8-character unique Trip ID (e.g., GOA26X91)
 */
export function generateTripCode(destinationName: string): string {
  const prefix = (destinationName || 'TRIP')
    .replace(/[^a-zA-Z]/g, '')
    .substring(0, 3)
    .toUpperCase() || 'YAT';
  
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const yearSuffix = new Date().getFullYear().toString().substring(2);
  
  return `${prefix}${yearSuffix}${randomChars}`;
}
