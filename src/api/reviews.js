const BASE_URL = import.meta.env.VITE_API || "http://localhost:3000";

export async function updateReview(id, body, token) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // Try to parse JSON error, otherwise fallback to plain text for clearer
    // diagnostics (some servers return plain text or HTML on error).
    let message = `Failed to update review (status ${response.status})`;
    try {
      const err = await response.json();
      message = err.error || err.message || JSON.stringify(err) || message;
    } catch (jsonErr) {
      try {
        const text = await response.text();
        if (text) message = text;
      } catch (textErr) {
        // ignore
      }
    }
    throw new Error(message);
  }

  return response.json();
}

export async function deleteReview(id, token) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    let message = "Failed to delete review";
    try {
      const err = await response.json();
      message = err.error || err.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}
