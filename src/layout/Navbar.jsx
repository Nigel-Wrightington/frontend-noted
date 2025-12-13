import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(); // Clears token + user in AuthContext
    navigate("/"); // Send user back to Home after logout
  }
  return (
    <header id="navbar">
      <div className="navbar-inner">
        {/* Website name (NOT a link anymore) */}
        <NavLink id="brand" to="/" className="brand-link">
          Noted
          <p>user-created album reviews of new music</p>
        </NavLink>

        {/* Navigation links */}
        <nav>
          {/* Always visible */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/review">Submit a Review!</NavLink>
          <NavLink to="/account">Account</NavLink>

          {isAuthenticated ? (
            // Logged IN
            <button onClick={handleLogout}>Logout</button>
          ) : (
            // Logged OUT
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
