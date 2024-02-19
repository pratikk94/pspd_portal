import { useState, useEffect } from "react";
import CircleAroundImage from "../components/CircleAroundImage";
import "../pages/LandingPage.css";
import { fields } from "../constants/constants";
import Card from "../components/Card";
import ExpandableList from "../components/ExpandableList";

export default function LandingPage() {
  const [count, setCount] = useState(0);
  const [circleData, setCircleData] = useState([]);
  const [typeData, setTypeData] = useState([]);
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
            marginTop: dimensions.height * 0.05,
            height: dimensions.height * 0.9,
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
            marginTop: dimensions.height * 0.05,
            height: dimensions.height * 0.9,
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

    const fetchDataApplication = async () => {
      const response = await fetch("http://localhost:3000/data");
      const data = await response.json();
      setCircleData(data);
    };

    fetchDataApplication().catch(console.error);

    const fetchDataType = async () => {
      const response = await fetch("http://localhost:3000/types");
      const data = await response.json();
      setTypeData(data);
    };

    fetchDataType().catch(console.error);

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
    //console.log(circleData[typeData[index]["type_name"]]);
    //console.log(typeData[index]["type_name"]);
    setModalContent(circleData[typeData[index]["type_name"]]);
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
        n={typeData.length}
        width={dimensions.width}
        height={dimensions.height}
        onCircleHover={handleCircleHover}
        data={typeData}
      />
      {isModalVisible && (
        <Modal position={modalPosition}>
          <ExpandableList content={modalContent} data={modalContent} />
        </Modal>
      )}
    </div>
  );
}
