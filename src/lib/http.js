// src/lib/http.js
export function apiUrl(path = "") {
  const base =
    process.env.REACT_APP_BACKEND_ORIGIN || "http://localhost:4000";
  return `${base}${path}`;
}