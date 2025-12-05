// Import Link so we can make a clickable link that routes without refreshing the page
import { Link } from "react-router-dom";

// This component shows a custom 404 page when the user goes to a route that doesn't exist
export default function NotFound() {
  return (
    // Main container for the 404 page
    <section className="page not-found">
      
      {/* Big 404 title so users know the page wasn't found */}
      <h1>404</h1>

      {/* Small message explaining the issue */}
      <p>Sorry, we could not find that page.</p>

      {/* Link that takes the user back to the homepage */}
      <Link to="/">
        Back to Home
      </Link>

    </section>
  );
}
