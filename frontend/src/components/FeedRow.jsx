import React from "react";
import Grid from "@mui/material/Grid";
import InstagramPost from "./FeedItem"; // Import the InstagramPost component

const InstagramPostRow = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(3)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <InstagramPost />
        </Grid>
      ))}
    </Grid>
  );
};

export default InstagramPostRow;
