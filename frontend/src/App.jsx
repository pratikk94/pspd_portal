import { Routes, Route, Outlet, Link } from "react-router-dom";
import NavBar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";
import Favorites from "./pages/Favorites";
import "./App.css";
export default function App() {
  return (
    <div className="main">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<LandingPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/requestAccess" element={<RequestAccess />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
