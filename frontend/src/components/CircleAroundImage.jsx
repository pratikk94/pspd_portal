import React, { useState } from "react";
import "./CircleAroundImage.css";
import logo from "../assets/logo.png";
import { fields } from "../constants/constants";
// Modal component to be defined
const Modal = ({ position, children, index }) => (
  <div
    style={{
      position: "absolute",
      top: position.top,
      left: position.left,
      zIndex: 10,
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid black",
      borderRadius: "10px",
    }}
  >
    {children}
    {fields[index]}
  </div>
);

const CircleAroundImage = ({ n, width, height, onCircleHover }) => {
  const [isImageHovered, setImageHovered] = useState(false);
  const [hoveredElementIndex, setHoveredElementIndex] = useState(-1);

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const radius = height / 3; // Radius from the center image to the circles
  const size = height * 0.9; // Container size, adjust based on your needs

  // Calculate position for each circle
  const calculateCirclePosition = (index) => {
    const angle = ((2 * Math.PI) / n) * index;
    const left = radius * Math.cos(angle) + size / 2 - width / 32;
    const top = radius * Math.sin(angle) + size / 2 - height / 20;
    return { left, top };
  };

  const [isMouseInLeftSide, setIsMouseInLeftSide] = useState(false);

  function setClassName() {
    if (isImageHovered) {
      return `circle expanded`;
    } else {
      return `circle`;
    }
  }

  const handleMouseMove = (event) => {
    const { clientX } = event;
    const screenWidth = window.innerWidth;
    setIsMouseInLeftSide(clientX < screenWidth / 2);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="container"
      style={{ width: size, height: size }}
      onMouseLeave={() => {
        console.log("left");
      }}
    >
      <img
        src={logo}
        alt="Center"
        className="center-image"
        onMouseEnter={() => setImageHovered(true)}
        style={{
          width: width / 10,
          height: height / 8,
          // marginLeft: width / 15,
          // marginTop: height / 10,
        }} // Adjust your image size
      />
      {Array.from({ length: n }).map((_, index) => {
        const { left, top } = calculateCirclePosition(index);
        return (
          <div
            key={index}
            className={
              setClassName() +
              (hoveredElementIndex === index ? ` highlighted` : "")
            }
            //   `circle ${isImageHovered ? "expanded" : ""} ${
            //   hoveredElementIndex === index  ? "highlighted" : ""
            // }`

            onMouseEnter={(e) => {
              setHoveredElementIndex(index);
              onCircleHover(index, e.target.getBoundingClientRect());
            }}
            // onMouseLeave={() => setHoveredElementIndex(-1)}
            style={{
              left,
              top,
              width: height / 7,
              height: height / 7,
            }}
          >
            <p
              style={{
                // marginLeft: width * 0.005,
                // marginTop: height * 0.06,

                width: width * 0.065,
                fontSize: height * 0.015,
                fontWeight: 600,
                wordWrap: "anywhere",
                textAlign: "center",
                color: hoveredElementIndex != index ? "white" : "#1672e3",
              }}
            >
              {fields[index]}
            </p>
            {/* {hoveredElementIndex === index && (
              <Modal position={modalPosition} index={index}></Modal>
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default CircleAroundImage;
