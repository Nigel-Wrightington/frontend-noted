import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./Register.css";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ first_name, last_name, username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form onSubmit={onRegister}>
        <label>
          First Name
          <input type="text" name="first_name" />
        </label>
        <label>
          Last Name
          <input type="text" name="last_name" />
        </label>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Create Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Register</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
