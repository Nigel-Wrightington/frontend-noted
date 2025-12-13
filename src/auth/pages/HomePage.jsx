import { useEffect, useState } from "react";

export default function Home() {
  const [highestRated, setHighestRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend URL (adjust for production)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  // Fetch highest rated reviews
  useEffect(() => {
    async function fetchHighestRated() {
      try {
        const res = await fetch(`${BACKEND_URL}/reviews/highest-rated`);
        if (!res.ok) throw new Error("Failed to fetch highest rated reviews");
        const data = await res.json();
        console.log("Highest Rated Reviews:", data); // debug log
        setHighestRated(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHighestRated();
  }, []);

  if (loading) return <p>Loading Highest Rated Reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Highest Rated Reviews</h2>
      {highestRated.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {highestRated.map((review) => {
            // Use backend URL for uploads, fallback to placeholder
            const imgSrc = review.img
              ? `${BACKEND_URL}/uploads/${encodeURIComponent(review.img)}`
              : "/placeholder.png";

            return (
              <li
                key={review.id}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={imgSrc}
                  alt={`${review.title} cover`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <strong>{review.title}</strong> by {review.artist} - Rating:{" "}
                  {review.rating}
                  <p>{review.review}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
