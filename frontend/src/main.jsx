import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import RequestAccess from "./pages/RequestAccess";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import SearchResultsPage from "./pages/SearchResults";
import Footer from "./components/Footer";

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
const App = () => {
  return (
    <Router>
      <div className="main">
        <NavBar />
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/requestAccess" element={<RequestAccess />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />

          {/* Add other Routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

// Ensure you have a div with id 'root' in your index.html
const container = document.getElementById("root");
const root = createRoot(container); // Create a root.
root.render(<App />);
