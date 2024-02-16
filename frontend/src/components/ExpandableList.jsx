import React, { useState } from "react";
import Card from "./Card";
import { fields } from "../constants/constants";
const ExpandableList = ({ items }) => {
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  const handleItemClick = (index) => {
    if (expandedItemIndex === index) {
      // If the clicked item is already expanded, collapse it
      setExpandedItemIndex(null);
    } else {
      // Otherwise, expand the clicked item
      setExpandedItemIndex(index);
    }
  };

  return (
    <ul>
      {[...Array(5).keys()].map((index) => (
        <li key={index} style={{ listStyleType: "none" }}>
          <div onMouseEnter={() => handleItemClick(index)}>
            <p style={{ textAlign: "left" }}>{fields[index]}</p>
            {expandedItemIndex === index && (
              <Card
                title={fields[index]}
                // onClick={() => handleCardClick(`Card ${index + 1}`)}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpandableList;
