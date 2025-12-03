import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ReviewPage from "./auth/pages/ReviewPage";
import Account from "./pages/account";
import NotFound from "./pages/notfound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        {/* Required for Navbar slice */}

        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
