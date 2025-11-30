import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="page account-page">
        <h1>Account</h1>
        <p>You must be logged in to view your account.</p>
        <Link className="btn primary" to="/login">
          Go to login
        </Link>
      </section>
    );
  }

  const displayName = user.first_name || user.username;

  return (
    <section className="page account-page">
      <h1>Account</h1>
      <div className="account-summary">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        {user.first_name && (
          <p>
            <strong>Name:</strong> {user.first_name} {user.last_name || ""}
          </p>
        )}
        <p>
          <strong>Member since:</strong>{" "}
          {user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <section className="account-reviews">
        <h2>{displayName}&apos;s Reviews</h2>
        {(!user.reviews || user.reviews.length === 0) && (
          <p>You haven't reviewed any albums yet.</p>
        )}

        {user.reviews && user.reviews.length > 0 && (
          <ul className="review-list">
            {user.reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <strong>
                    {review.album?.title} – {review.album?.artist}
                  </strong>
                </div>
                <div className="review-rating">
                  Rating: {review.rating} / 5
                </div>
                <p className="review-comment">{review.comment}</p>
                <div className="review-date">
                  {review.created_at &&
                    new Date(review.created_at).toLocaleDateString()}
                </div>
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