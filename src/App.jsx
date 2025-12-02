import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";

// These are just temp placeholder for Navbar to work //=====
function Browse() {
  return <p>Browse page (placeholder)</p>;
}
function Account() {
  return <p>Account page (placeholder)</p>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        {/* Required for Navbar slice */}
        <Route path="/browse" element={<Browse />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
