import { Routes, Route, Outlet, Link } from "react-router-dom";
import NavBar from "./components/Navbar";
import RequestAccess from "./pages/RequestAccess";
import Favorites from "./pages/Favorites";
import "./App.css";
import SearchResultsPage from "./pages/SearchResults";
import OrbitingCircles from "./pages/LandingPage";
import PaperRolls from "./pages/LandingPage";
import BooksTable from "./pages/LandingPage";
import Home from "./pages/Home";
export default function App() {
  return (
    <div className="main">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}

      {/* <Routes>
        <Route path="/" element={<NavBar />}>
          <Route
            index
            element={
              <Home />
              //<OrbitingCircles numberOfCircles={10} />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/requestAccess" element={<RequestAccess />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. }
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes> */}
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
