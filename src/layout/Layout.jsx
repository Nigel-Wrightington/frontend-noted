import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="page">
      {/* Centered container (same as .page styles in index.css) */}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
