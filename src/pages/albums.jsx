// src/pages/Albums.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// TODO: update this path/name to match your actual API helper
// For example, if your file is src/api/api.js and it exports fetchAlbums:
import { fetchAlbums } from "../api/api";

// This page shows a list of all albums
export default function Albums() {
  // Keep track of albums from the API
  const [albums, setAlbums] = useState([]);
  // Loading state while we wait for the API
  const [loading, setLoading] = useState(true);
  // Message for errors or status
  const [message, setMessage] = useState("");

  // Run once when the component first loads
  useEffect(() => {
    async function loadAlbums() {
      setLoading(true);
      setMessage("");

      try {
        // Call the API to get all albums
        const data = await fetchAlbums();
        setAlbums(data || []);
      } catch (error) {
        console.error("Error loading albums:", error);
        setMessage("Could not load albums.");
      } finally {
        setLoading(false);
      }
    }

    loadAlbums();
  }, []);

  // While we are waiting for the API
  if (loading) {
    return <p>Loading albums...</p>;
  }

  // If something went wrong or we got no albums back
  if (!loading && albums.length === 0) {
    return (
      <section className="page albums-page">
        <h1>Albums</h1>
        {message ? <p>{message}</p> : <p>No albums found.</p>}
      </section>
    );
  }

  return (
    <section className="page albums-page">
      <h1>Albums</h1>

      {message && <p className="status-message">{message}</p>}

      {/* Simple list of albums */}
      <ul className="albums-list">
        {albums.map((album) => {
          // Safely grab the fields we need
          const title = album.title || "Untitled Album";
          const artist = album.artist || "Unknown Artist";
          const genre = album.genre || "Unknown Genre";
          const averageRating = album.averageRating ?? "No ratings yet";

          return (
            <li key={album.id} className="album-item">
              {/* Clicking the title will go to /albums/:id */}
              <h2 className="album-title">
                <Link to={`/albums/${album.id}`}>{title}</Link>
              </h2>

              <p>
                <strong>Artist:</strong> {artist}
              </p>

              <p>
                <strong>Genre:</strong> {genre}
              </p>

              <p>
                <strong>Average Rating:</strong> {averageRating}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
