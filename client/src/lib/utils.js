/**
 * Combines multiple class names into a single string
 * @param  {...string} inputs - Class names to be combined
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}