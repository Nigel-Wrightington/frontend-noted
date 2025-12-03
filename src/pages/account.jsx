// Account.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// Shows account info for a logged-in user
export default function Account() {
  // Get the current user from AuthContext
  const { user } = useAuth();

  // Handy for debugging in DevTools:
  console.log("Account page user:", user);

  // If no user, tell them to log in
  if (!user) {
    return (
      <section className="page account-page">
        <h1>Account</h1>
        <p>You must be logged in to view your account.</p>
        <Link to="/login">Go to login</Link>
      </section>
    );
  }

  // Use first name if it exists, otherwise fall back to username
  const displayName = user.first_name || user.username || "Your";

  return (
    <section className="page account-page">
      <h1>Account</h1>

      {/* Basic user info */}
      <div className="account-summary">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        {user.email && (
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        )}
      </div>

      {/* Reviews section – this will safely handle "no reviews" */}
      <section className="account-reviews">
<<<<<<< Updated upstream
        <h2>{user.username}s Reviews</h2>
=======
        <h2>{displayName}s Reviews</h2>
>>>>>>> Stashed changes

        {/* If there are no reviews, show a message */}
        {(!user.reviews || user.reviews.length === 0) && (
          <p>You have not reviewed any albums yet.</p>
        )}

        {/* If there ARE reviews, render them */}
        {user.reviews && user.reviews.length > 0 && (
          <ul className="review-list">
            {user.reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-rating">
                  Rating: {review.rating} / 5
                </div>
                <p className="review-comment">{review.comment}</p>
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
