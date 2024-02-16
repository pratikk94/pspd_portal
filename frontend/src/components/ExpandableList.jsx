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
    <div>
      {/*   <p>{items.content}</p> */}
      <ul>
        {[...Array(5).keys()].map((index) => (
          <li key={index} style={{ listStyleType: "none" }}>
            <div onMouseEnter={() => handleItemClick(index)}>
              <p style={{ textAlign: "left" }}>
                {"Application " + (index + 1)}
              </p>
              {expandedItemIndex === index && (
                <Card
                  title={"Application " + (index + 1)}
                  // onClick={() => handleCardClick(`Card ${index + 1}`)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpandableList;
