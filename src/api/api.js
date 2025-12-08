// src/api/api.js

const BASE_URL = import.meta.env.VITE_API || "http://localhost:3000/api";

// GET /api/albums
export async function fetchAlbums() {
  const response = await fetch(`${BASE_URL}/albums`);
  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }
  return response.json();
}

// GET /api/albums/:id
export async function fetchAlbumById(id) {
  const response = await fetch(`${BASE_URL}/albums/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch album details");
  }
  return response.json();
}

// POST /api/reviews (multipart/form-data expected)
export async function createReview(formData, token) {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    let message = "Failed to create review";
    try {
      const err = await response.json();
      message = err.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}
