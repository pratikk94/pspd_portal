// NavBar.js
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
export default function NavBar({ onNavClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`); // Navigate to the search page with the query
  };

  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="navbar">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <img src={logo} className="navBarIcon"></img>
            </Link>
            <Link className="nav-item" to="/">
              Home
            </Link>
            <Link className="nav-item" to="/favorites">
              Favorites
            </Link>
            <Link className="nav-item" to="/requestAccess">
              Request access
            </Link>
          </div>
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: -40,
              marginRight: 40,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              label="Search"
              value={searchQuery}
              style={{ marginLeft: "-2vw", width: "20vw" }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" color="inherit" sx={{ ml: 1 }}>
              Search
            </Button>
          </form>
        </Box>

        {/* <form
          onSubmit={handleSearch}
          style={{ display: "flex", alignItems: "center", right: "0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" color="inherit" sx={{ ml: 1 }}>
            Search
          </Button>
        </form> */}
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}
