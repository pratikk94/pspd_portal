import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

export default function EnhancedAccordion() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Fetching data failed", error));
  }, []);

  return (
    <div>
      {Object.keys(data).map((type, index) => (
        <Accordion
          key={index}
          sx={{
            backgroundColor: "#fffd",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
            //marginBottom: "20px",
            //borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
            sx={{
              backgroundColor: "rgba(255, 255, 250, 0.9)",
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(180deg)",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 240, 0.9)",
              },
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
              {type}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "rgba(255, 255, 245, 0.9)",
              textAlign: "left",
            }}
          >
            {data[type].map((item, subIndex) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 1, // sets the border width
                    borderColor: "#ffc169", // you can use the theme's color palette
                    borderRadius: 1,
                    backgroundColor: "transparent",
                    textAlign: "left",
                    margin: 2,
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)", // Optional: Highlight on hover
                    },
                  }}
                >
                  <img
                    src={`http://localhost:3000/${item.image}`}
                    alt="Item logo"
                    style={{
                      width: "6vw",
                      height: "9vh",
                      marginRight: "20px",
                    }}
                  />
                  <Box sx={{ textAlign: "left" }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </a>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
