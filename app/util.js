// Format time for non 12h Display and fix 0:00 at midnight
import userSettings from "user-settings";
export function formatHours(hours) {
  if (userSettings.preferences.clockDisplay == "12h" && hours > 12) hours-=12;
  if (userSettings.preferences.clockDisplay == "12h" && hours == 0) hours = 12;
  return hours;
}

// Remove all quotation marks from a string
export function stripQuotes(str) {
  return str ? str.replace(/"/g, "") : "";
}