import React from "react";
import Masonry from "@mui/lab/Masonry";
import { Paper } from "@mui/material";

const StaggeredGrid = () => {
  // Example image URLs - replace these with your actual image sources
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/300x200",
    "https://via.placeholder.com/250x150",
    "https://via.placeholder.com/200x300",
    "https://via.placeholder.com/400x250",
    "https://via.placeholder.com/250x400",
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/350x250",
    "https://via.placeholder.com/250x350",
    "https://via.placeholder.com/450x300",
  ];

  return (
    <Masonry columns={4} spacing={2}>
      {images.map((image, index) => (
        <Paper key={index} elevation={3} sx={{ borderRadius: 2 }}>
          <img
            src={image}
            alt={`img-${index}`}
            style={{ width: "100%", display: "block", borderRadius: "8px" }}
          />
        </Paper>
      ))}
    </Masonry>
  );
};

export default StaggeredGrid;
