/**
 * Formats a date string as relative time (e.g., "2 days ago", "yesterday")
 * Uses native Intl.RelativeTimeFormat for localization support
 * @param dateString - ISO date string from database
 * @returns Human-readable relative time string
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Handle invalid date
    if (isNaN(date.getTime())) {
      return 'Unknown date';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    // Choose appropriate unit based on time difference
    if (Math.abs(diffInSeconds) < 60) {
      return rtf.format(-diffInSeconds, 'second');
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (Math.abs(diffInMinutes) < 60) {
      return rtf.format(-diffInMinutes, 'minute');
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (Math.abs(diffInHours) < 24) {
      return rtf.format(-diffInHours, 'hour');
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (Math.abs(diffInDays) < 7) {
      return rtf.format(-diffInDays, 'day');
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (Math.abs(diffInWeeks) < 4) {
      return rtf.format(-diffInWeeks, 'week');
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    return rtf.format(-diffInMonths, 'month');
  } catch {
    return 'Unknown date';
  }
}
