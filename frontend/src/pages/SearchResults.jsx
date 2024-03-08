import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { backend_url } from "../urls";
const SearchPage = () => {
  const [applications, setApplications] = useState([]);
  const userId = 1;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchLikedApplications(query);
    console.log(query);
  }, [userId, query]);

  const fetchLikedApplications = async (query) => {
    try {
      const response = await axios.get(
        `${backend_url}/applications?page=${page}&limit=9&search=${query}`
      );
      setApplications(response.data["data"] || []);
      console.log(response.data["count"][0]["count"]);
      setTotalPages(Math.ceil(response.data["count"][0]["count"] / 9));
    } catch (error) {
      console.error("Failed to fetch liked applications:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const toggleLike = async (applicationId, liked) => {
    try {
      // Optimistically remove the application from the view before making the API call
      setApplications((currentApplications) =>
        currentApplications.filter((app) => app.applicationId !== applicationId)
      );

      // Then, send the request to the backend to update the like status.
      // Note: This assumes your backend toggles the `liked` status and doesn't need a specific liked/disliked value.
      await axios.post(`${backend_url}/toggle-like`, {
        userId,
        applicationId,
        liked: !liked,
      });
      console.log(query);
      fetchLikedApplications(query);
    } catch (error) {
      console.error("Failed to toggle like/dislike:", error);
      // Optionally, handle errors, for example, by showing an error message or undoing the optimistic update.
    }
  };

  return (
    <div style={{ height: "100vh", padding: "1vw" }}>
      <Grid container spacing={2}>
        {applications.map((app) => (
          <Grid item xs={12} sm={6} md={4} key={app.applicationId}>
            <Card style={{ height: 240 }}>
              <CardActions>
                <IconButton
                  onClick={() => toggleLike(app.id, app.liked)}
                  style={{ marginLeft: "88%" }}
                >
                  {app.liked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </CardActions>
              <CardContent>
                <img
                  style={{ height: 60 }}
                  src={`${backend_url}${app.image}`}
                ></img>
                <br />
                <Typography gutterBottom variant="h5" component="div">
                  {app.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {app.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <br />
        <br />
      </Grid>
      <center>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{
            marginTop: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        />
      </center>
    </div>
  );
};

export default SearchPage;
