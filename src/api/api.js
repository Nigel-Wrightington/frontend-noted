// src/api/api.js

const BASE_URL = "http://localhost:3000/api";

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
