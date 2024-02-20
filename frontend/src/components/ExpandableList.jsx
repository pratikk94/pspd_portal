import React, { useState } from "react";
import Card from "./Card";
import { backend_url } from "../urls";
const ExpandableList = ({ items, data }) => {
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

  //console.log(data);

  return (
    <div>
      {/*   <p>{items.content}</p> */}
      <ul>
        {[...Array(data.length).keys()].map((index) => (
          <li key={index} style={{ listStyleType: "none" }}>
            <div onMouseEnter={() => handleItemClick(index)}>
              <p style={{ textAlign: "left", color: "black" }}>
                {data[index]["name"]}
              </p>
              {expandedItemIndex === index && (
                <Card
                  title={data[index]["name"]}
                  content={data[index]["description"]}
                  image={`${backend_url}${data[index]["image"]}`}
                  applicationId={data[index]["id"]}
                  userId={1}
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
