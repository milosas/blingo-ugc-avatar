/**
 * Downloads an image from a URL with a sanitized filename
 * @param url - The image URL to download
 * @param filename - The desired filename (will be sanitized)
 */
export function downloadImage(url: string, filename: string): void {
  // Sanitize filename: replace non-alphanumeric chars (except . and -) with underscore
  // Limit to 255 characters (filesystem limit)
  const sanitized = filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .slice(0, 255);

  // Create anchor element
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = sanitized;

  // Append to body, click, and remove
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
