import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Account from "./pages/account";
import NotFound from "./pages/notfound";






<<<<<<< Updated upstream
=======
// These are just temp placeholder for Navbar to work //=====
function Browse() {
  return <p>Browse page (placeholder)</p>;
}
function Account() {
  return <p>Account page (placeholder)</p>;
}

>>>>>>> Stashed changes
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
<<<<<<< Updated upstream
=======
        {/* Required for Navbar slice */}
        <Route path="/browse" element={<Browse />} />
        <Route path="/account" element={<Account />} />
>>>>>>> Stashed changes
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
