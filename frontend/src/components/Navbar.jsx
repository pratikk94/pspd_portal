// NavBar.js
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
export default function NavBar({ onNavClick }) {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="navbar">
        <Link className="nav-item" to="/">
          Home
        </Link>
        <Link className="nav-item" to="/favorites">
          Favorites
        </Link>
        <Link className="nav-item" to="/requestAccess">
          Request access
        </Link>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
