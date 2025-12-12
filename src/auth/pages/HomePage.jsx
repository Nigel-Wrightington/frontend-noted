import { useEffect, useState } from "react";

export default function Home() {
  const [highestRated, setHighestRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch highest rated reviews
  useEffect(() => {
    async function fetchHighestRated() {
      try {  
        const res = await fetch("/reviews/highest-rated");
        if(!res.ok) throw new Error("Failed to fetch highest rated reviews");
        const data = await res.json();
        setHighestRated(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHighestRated();
  }, []);


  if (loading) return <p>Loading Highest rated reviews</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Noted</h1>
      <p>user-created album reviews of new music</p>

      <section>
        <h2>Highest Rated Reviews</h2>
        {highestRated.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <ul>
            {highestRated.map((review) => (
              <li key={review.id}>
                <img
                  src={`/uploads/${review.img}`}   
                  alt={`${review.title} cover`}
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                />
                <strong>{review.title}</strong> by {review.artist} - Rating: {review.rating}
                <p>{review.review}</p> 
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
