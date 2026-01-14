function getToken() {
  return localStorage.getItem("admin_token") || "";
}

// Usamos la misma env var que el resto del front (Netlify)
const API_BASE = process.env.REACT_APP_BACKEND_ORIGIN || "http://localhost:4000";

export async function api(path, options = {}) {
  const token = getToken();

  // Clonar headers para poder ajustar sin pisar
  const headers = { ...(options.headers || {}) };

  // Si body es FormData, NO setear Content-Type (browser lo setea)
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!isFormData) {
    if (!headers["Content-Type"] && !headers["content-type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const r = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.message || `Error HTTP ${r.status}`);
  return data;
}
