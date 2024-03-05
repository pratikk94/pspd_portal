import React, { useState } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const CircleSegment = styled(Box)(({ theme, angle, expanded }) => ({
  background: theme.palette.primary.main,
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  clipPath: `polygon(50% 50%, ${angle}% 0, 100% 0, 100% 100%, ${angle}% 100%)`,
  transition: "transform 0.5s",
  transform: expanded ? "scale(1.1)" : "scale(1)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transformOrigin: "top left",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.1)",
  },
}));

const CircleMenu = () => {
  const theme = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Calculate the position for each segment based on index
  const calculatePosition = (index) => {
    const angle = 360 / 10; // Assuming 10 segments
    return `rotate(${angle * index}deg)`;
  };

  return (
    <Box position="relative" width="400px" height="400px">
      {Array.from({ length: 10 }).map((_, index) => (
        <CircleSegment
          key={index}
          angle={(index + 1) * (100 / 10)} // Calculate end angle for each segment
          expanded={expandedIndex === index}
          style={{ transform: calculatePosition(index) }}
          onClick={() => setExpandedIndex(index)}
        >
          {/* Content for each segment */}
        </CircleSegment>
      ))}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        style={{
          transform: "translate(-50%, -50%)",
          width: theme.spacing(20),
          height: theme.spacing(20),
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src="your-image-url.jpg"
          alt="Central"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default CircleMenu;
