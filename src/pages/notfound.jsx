import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page not-found">
      <h1>404</h1>
      <p>Sorry, we couldn't find that page.</p>
      <Link to="/">
        Back to Home
      </Link>
    </section>
  );
}