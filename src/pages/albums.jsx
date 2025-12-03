// Album.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// TODO: update this import to match your real API file + function names
// For example: "../api/api" or "../API/api"
import { fetchAlbumById /* , likeAlbum, unlikeAlbum */ } from "../api/api";

export default function Album() {
  // Get :id from the URL, e.g. /albums/3
  const { id } = useParams();

  // Pull user (and optionally token, if your AuthContext provides it)
  const { user /* , token */ } = useAuth();

  // Local state: album data, status message, loading
  const [album, setAlbum] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Load album when the component mounts or when the ID changes
  useEffect(() => {
    async function loadAlbum() {
      setLoading(true);
      setMessage("");

      try {
        const data = await fetchAlbumById(id);
        setAlbum(data);
      } catch (error) {
        console.error("Error fetching album:", error);
        setMessage("Could not load album details.");
      } finally {
        setLoading(false);
      }
    }

    loadAlbum();
  }, [id]);

  // Example of an action that requires login (like/favorite, review, etc.)
  async function handleDoSomething() {
    if (!user) {
      setMessage("You must be logged in to do that.");
      return;
    }

    // If you have a token in AuthContext, you can use it here:
    // if (!token) { ... }

    try {
      // TODO: call your real action here (likeAlbum, addReview, etc.)
      // const result = await likeAlbum(album.id, token);

      // For now, just fake a success:
      setMessage("Action completed! (wire this up to your real API)");

      // Optionally re-fetch the album to refresh data after the action
      // const updated = await fetchAlbumById(id);
      // setAlbum(updated);
    } catch (error) {
      console.error("Error performing album action:", error);
      setMessage("Something went wrong while performing that action.");
    }
  }

  // Loading + not found states (like your BookDetails example)
  if (loading) return <p>Loading album details...</p>;
  if (!album) return <p>Album not found.</p>;

  // You can adjust these fields to match your actual album shape
  const title = album.title || album.name || "Untitled album";
  const artist = album.artist || album.artist_name || "Unknown artist";

  return (
    <section className="page album-page">
      <h1>{title}</h1>

      {/* If your API includes a cover image, show it */}
      {album.coverImage && (
        <img
          src={album.coverImage}
          alt={title}
          className="album-cover"
          width="200"
          height="200"
        />
      )}

      <p>
        <strong>Artist:</strong> {artist}
      </p>

      {album.year && (
        <p>
          <strong>Year:</strong> {album.year}
        </p>
      )}

      {album.description && (
        <p>
          <strong>Description:</strong> {album.description}
        </p>
      )}

      {/* Example button that only really makes sense when logged in */}
      <button onClick={handleDoSomething} className="album-action-btn">
        {user ? "Do album action" : "Log in to interact"}
      </button>

      {/* Optional: show tracks if your API returns them */}
      {album.tracks && album.tracks.length > 0 && (
        <section className="album-tracks">
          <h2>Tracks</h2>
          <ol>
            {album.tracks.map((track) => (
              <li key={track.id || track.title}>
                {track.title} {track.length && `– ${track.length}`}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Optional: show reviews if the album has them */}
      {album.reviews && album.reviews.length > 0 && (
        <section className="album-reviews">
          <h2>Reviews</h2>
          <ul>
            {album.reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.rating}/5</strong> – {review.comment}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Status / error / success message */}
      {message && <p className="status-message">{message}</p>}

      {/* Simple way back to a list page if you have one */}
      <p>
        <Link to="/albums">Back to albums</Link>
      </p>
    </section>
  );
}
