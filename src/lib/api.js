const API =
  process.env.REACT_APP_BACKEND_ORIGIN || "http://localhost:4000";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error en API");
  }

  return res.json();
}
