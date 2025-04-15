/**
 * Formats a Date object to a string based on the specified locales and options.
 *
 * @param date - The Date object to format.
 * @param locales - A string representing the locales to use; defaults to 'en'.
 * @param options - An Intl.DateTimeFormatOptions object defining formatting behavior; defaults to an object with year, month, and day.
 * @returns A formatted date and time string.
 */
export function formatDate(
  date: Date,
  locales: string = "zh-CN", // Changed default locale to Chinese
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",   // Added hour
    minute: "2-digit", // Added minute
    hour12: false      // Use 24-hour format
  },
) {
  // Use toLocaleString to include time. The exact output format depends on the locale.
  // For zh-CN, it might be like "2025/04/15 23:00" or similar.
  return date.toLocaleString(locales, options);
}
