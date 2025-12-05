import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(null); // current logged-in user from backed requirebody // SS //
  const [status, setStatus] = useState("idle"); // Loading erorr message and status // SS //
  const [error, setError] = useState(null); // Auth error message (if any) // SS //

  // Session storage to sync with token for users // SS //
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  
const register = async (credentials) => {
  const response = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    
    let errorMsg = "Register Failed";
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  const result = await response.json();
  setToken(result.token);
};
  // ===== FETCH CURRENT LOGGED-IN USER REQUIREUSER/ME // === BOOKBUDDY // SS //

  async function fetchCurrentUser(currentToken) {
    if (!currentToken) {
      setUser(null);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(API + "/users/me", {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        const msg = await response.text();
        setUser(null);
        setStatus("error");
        setError(msg || "Failed to load user.");
        return;
      }

      const data = await response.json();
      setUser(data);
      setStatus("authenticated");
    } catch (err) {
      console.error("Error fetching /users/me:", err);
      setUser(null);
      setStatus("error");
      setError("Failed to load user.");
    }
  }
  // AUTO LOAD USER WHENEVER TOKEN CHANGES // SS //
  useEffect(() => {
    fetchCurrentUser(token);
  }, [token]);

  // LOGIN  VERTICAL // SS//

  const login = async (credentials) => {
    setStatus("loading");
    setError(null);

    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const text = await response.text();

    if (!response.ok) {
      setStatus("error");
      setError(text || "Login failed.");
      throw Error(text);
    }

    // LOGIN ROUTE TO SEND JSON: { token } // PARSE THE TOKEN & SUPPER PLAIN TEXT //
    let actualToken;
    try {
      const data = JSON.parse(text);
      actualToken = data.token ?? text;
    } catch {
      actualToken = text;
    }

    setToken(actualToken);
    setStatus("authenticated");
  };

  //======== LOGOUT VERTICAL -- SHERIN FRONTEND ONLY BY DELETING TOKEN ====== //

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
    setUser(null);
    setStatus("idle");
    setError(null);
  };
  const value = {
    token,
    user,
    status,
    error,
    isAuthenticated: !!user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
