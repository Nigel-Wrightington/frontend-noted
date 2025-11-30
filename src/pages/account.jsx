// Importing Link from react-router-dom to handle internal navigation
import { Link } from "react-router-dom";

// Importing the useAuth hook from the AuthContext to access the user info
import { useAuth } from "../context/AuthContext";

// The Account component shows user account info and their album reviews
export default function Account() {
  // Destructure the user object from the authentication context
  const { user } = useAuth();

  // If the user is not logged in, display a message prompting them to log in
  if (!user) {
    return (
      <section className="page account-page">
        <h1>Account</h1>
        <p>You must be logged in to view your account.</p>
        {/* Link to navigate the user to the login page */}
        <Link to="/login">
          Go to login
        </Link>
      </section>
    );
  }

  // Fallback display name if first name is not available
  const displayName = user.first_name || user.username;

  // Main return block for logged-in users
  return (
    <section className="page account-page">
      <h1>Account</h1>

      {/* Summary section showing user's basic info */}
      <div className="account-summary">
        <p>
          <strong>Username:</strong> {user.username}
        </p>

        {/* Conditionally render full name only if first_name is available */}
        {user.first_name && (
          <p>
            <strong>Name:</strong> {user.first_name} {user.last_name || ""}
          </p>
        )}
      </div>

      {/* Reviews section */}
      <section className="account-reviews">
        <h2>{displayName}'s Reviews</h2>

        {/* Show a message if there are no reviews */}
        {(!user.reviews || user.reviews.length === 0) && (
          <p>You haven't reviewed any albums yet.</p>
        )}

        {/* Render a list of reviews if available */}
        {user.reviews && user.reviews.length > 0 && (
          <ul className="review-list">
            {user.reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <strong>
                    {/* Safely access album title and artist with optional chaining */}
                    {review.album?.title} – {review.album?.artist}
                  </strong>
                </div>
                <div className="review-rating">
                  Rating: {review.rating} / 5
                </div>
                <p className="review-comment">{review.comment}</p>
                {/* Link to navigate to the reviewed album's detail page */}
                <Link to={`/albums/${review.album?.id}`}>
                  View album details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
