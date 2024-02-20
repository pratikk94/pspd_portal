import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { backend_url } from "../urls";
const LikedApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const userId = 1;
  useEffect(() => {
    fetchLikedApplications();
  }, [userId]);

  const fetchLikedApplications = async () => {
    try {
      const response = await axios.get(
        `${backend_url}api/liked-applications/${userId}`
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch liked applications:", error);
    }
  };

  const toggleLike = async (applicationId) => {
    try {
      // Optimistically remove the application from the view before making the API call
      setApplications((currentApplications) =>
        currentApplications.filter((app) => app.applicationId !== applicationId)
      );

      // Then, send the request to the backend to update the like status.
      // Note: This assumes your backend toggles the `liked` status and doesn't need a specific liked/disliked value.
      await axios.post(`${backend_url}api/toggle-like`, {
        userId,
        applicationId,
        liked: "0",
      });

      fetchLikedApplications();
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
                  onClick={() => toggleLike(app.id)}
                  style={{ marginLeft: "88%" }}
                >
                  {!app.liked ? (
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
      </Grid>
    </div>
  );
};

export default LikedApplicationsPage;
