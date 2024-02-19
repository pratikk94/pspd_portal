import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CardComponent = ({ userId, applicationId }) => {
  const [likedStatus, setLikedStatus] = useState("none"); // Possible values: 'liked', 'disliked', 'none'

  useEffect(() => {
    // Initially fetch the like status for the card
    axios
      .get(
        `http://localhost:3000/api/application-status/${userId}?applicationId=${applicationId}`
      )
      .then((response) => {
        setLikedStatus(response.data.status); // Assume the API returns { status: 'liked' } or { status: 'disliked' } or { status: 'none' }
      })
      .catch((error) =>
        console.error("Error fetching like/dislike status:", error)
      );
  }, [userId, applicationId]);

  const toggleLikeDislike = () => {
    const liked = likedStatus !== "liked"; // If currently liked, we want to unlike it, and vice-versa
    console.log(userId);
    console.log(applicationId);
    axios
      .post(`http://localhost:3000/api/toggle-like`, {
        userId,
        applicationId,
        liked,
      })
      .then(() => {
        setLikedStatus(liked ? "liked" : "none"); // Optimistically update the UI based on the action
      })
      .catch((error) =>
        console.error("Error toggling like/dislike status:", error)
      );
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* Card content goes here */}
          Application Content Here
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={toggleLikeDislike}>
          {likedStatus === "liked" ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
