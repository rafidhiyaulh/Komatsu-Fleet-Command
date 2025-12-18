const rawBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

export function apiUrl(pathname) {
  if (!pathname) return API_BASE_URL;
  if (pathname.startsWith("/")) return `${API_BASE_URL}${pathname}`;
  return `${API_BASE_URL}/${pathname}`;
}

