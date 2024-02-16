import { useState, useEffect } from "react";
import CircleAroundImage from "../components/CircleAroundImage";
import "../pages/LandingPage.css";
import { fields } from "../constants/constants";
import Card from "../components/Card";
export default function LandingPage() {
  const [count, setCount] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const Modal = ({ position, children }) => {
    if (position.left < dimensions.width * 0.5 + dimensions.width / 20) {
      return (
        <div
          style={{
            position: "absolute",
            marginTop: dimensions.height * 0.25,
            height: dimensions.height * 0.5,
            width: dimensions.width * 0.15,
            top: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      );
    } else {
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 10,
            marginTop: dimensions.height * 0.25,
            height: dimensions.height * 0.5,
            width: dimensions.width * 0.15,
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      );
    }
  };

  // Effect to listen for window resize events
  useEffect(() => {
    function handleResize() {
      // Update the dimensions in the state
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPosition, setModalPosition] = useState({});

  const handleCircleHover = (index, rect) => {
    setModalVisible(true);
    setModalContent(fields[index]);
    setModalPosition({ top: rect.top, left: rect.right }); // Adjust this based on your modal positioning logic
  };

  return (
    <div
      className="landing_container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <CircleAroundImage
        n={10}
        width={dimensions.width}
        height={dimensions.height}
        onCircleHover={handleCircleHover}
      />
      {isModalVisible && (
        <Modal position={modalPosition}>
          {[...Array(5).keys()].map((index2) => (
            <Card
              title={modalContent}
              // onClick={() => handleCardClick(`Card ${index + 1}`)}
            />
          ))}
        </Modal>
      )}
    </div>
  );
}
