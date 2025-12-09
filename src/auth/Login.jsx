import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login, status, error: authError } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    setError(null);

    try {
      await login({ username, password }); // Login structure //
      navigate("/"); // Navigate to home when logged in //
    } catch (e) {
      setError(e.message);
    }
  };
  const isLoading = status === "loading";
  const displayedError = error || authError;

  // Return == Form UI here with a LOGIN FORM == Sherin // NO CHANGE //
  return (
    <>
      <h1>Log in to your account</h1>
      <form onSubmit={onLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {displayedError && (
          <output style={{ color: "red" }}>{displayedError}</output>
        )}
      </form>
      <Link to="/register">Need an account? Register here.</Link>
    </>
  );
}
