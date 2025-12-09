// Importing Link from react-router-dom to handle internal navigation
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Importing the useAuth hook from the AuthContext to access the user info
import { useAuth } from "../auth/AuthContext";
import { fetchReviews } from "../api/api";

const API_BASE = import.meta.env.VITE_API || "http://localhost:3000";

// The Account component shows user account info and their album reviews
export default function Account() {
  // Destructure the user object from the authentication context
  const { user } = useAuth();
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's reviews when user loads
  useEffect(() => {
    if (!user || !user.id) return;

    setLoading(true);
    setError(null);

    fetchReviews()
      .then((reviews) => {
        // Filter reviews to only show the current user's reviews
        const filtered = reviews.filter((review) => review.user_id === user.id);
        setUserReviews(filtered);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // If the user is not logged in, display a message prompting them to log in
  if (!user) {
    return (
      <section className="page account-page">
        <h1>Account</h1>
        <p>You must be logged in to view your account.</p>
        {/* Link to navigate the user to the login page */}
        <Link to="/login">Go to login</Link>
      </section>
    );
  }
  // Main return block for logged-in users
  return (
    <section className="page account-page">
      <h1>Account</h1>

      {/* Summary section showing user's basic info */}
      <div className="account-summary">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
      </div>

      {/* Reviews section */}
      <section className="account-reviews">
        <h2>{user.username}'s Reviews</h2>

        {loading && <p>Loading reviews...</p>}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* Show a message if there are no reviews */}
        {!loading && (!userReviews || userReviews.length === 0) && (
          <p>You have not reviewed any albums yet.</p>
        )}

        {/* Render a list of reviews if available */}
        {!loading && userReviews && userReviews.length > 0 && (
          <ul className="review-list">
            {userReviews.map((review) => (
              <li key={review.id} className="review-item">
                {review.img && (
                  <img
                    src={`${API_BASE}/uploads/${review.img}`}
                    alt={review.title}
                    className="album-cover"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      console.error("Image failed to load:", e.target.src);
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="review-rating">
                  {review.title && <strong>{review.title}</strong>}
                  {review.artist && <p>Artist: {review.artist}</p>}
                  <p>Rating: {review.rating} / 5</p>
                </div>
                <p className="review-comment">{review.review}</p>
                {/* Link to navigate to the reviewed album's detail page */}
                {review.album_id && (
                  <Link to={`/albums/${review.album_id}`}>
                    View album details
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
