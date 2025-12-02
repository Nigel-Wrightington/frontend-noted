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
      {/* Website name on the left // Optional, incase we need it for css */}
      <NavLink id="brand" to="/">
        <p>Noted</p>
      </NavLink>

      {/* Navigation links */}
      <nav>
        {/* Always visible on all states (logged in/out) */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/account">Account</NavLink>

        {isAuthenticated ? (
          // Logged IN: show only Logout // will shwo all other links too //
          <button onClick={handleLogout}>Logout</button>
        ) : (
          // Logged OUT: show Login + Register plus all other navlinks //
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
