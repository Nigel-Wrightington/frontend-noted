// src/pages/Albums.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../api/api.js";

// This page shows a list of all albums
export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadAlbums() {
      setLoading(true);
      setMessage("");

      try {
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

  if (loading) return <p>Loading albums...</p>;

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

      <ul className="albums-list">
        {albums.map((album) => {
          const title = album.title || "Untitled Album";
          const artist = album.artist || "Unknown Artist";
          const genre = album.genre || "Unknown Genre";

          return (
            <li key={album.id} className="album-item">
              <h2 className="album-title">
                <Link to={`/albums/${album.id}`}>{title}</Link>
              </h2>

              <p>
                <strong>Artist:</strong> {artist}
              </p>
              <p>
                <strong>Genre:</strong> {genre}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
