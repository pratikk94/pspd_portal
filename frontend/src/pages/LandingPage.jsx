// import { useState, useEffect } from "react";
// import CircleAroundImage from "../components/CircleAroundImage";
// import "../pages/LandingPage.css";
// import Card from "../components/Card";
// import ExpandableList from "../components/ExpandableList";
// import { backend_url } from "../urls";
// export default function LandingPage() {
//   const [count, setCount] = useState(0);
//   const [circleData, setCircleData] = useState([]);
//   const [typeData, setTypeData] = useState([]);
//   const [dimensions, setDimensions] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const Modal = ({ position, children }) => {
//     if (position.left < dimensions.width * 0.5 + dimensions.width / 20) {
//       return (
//         <div
//           style={{
//             position: "absolute",
//             marginTop: dimensions.height * 0.14,
//             height: dimensions.height * 0.88,
//             width: dimensions.width * 0.15,
//             top: 0,
//             left: 0,
//             zIndex: 10,
//             backgroundColor: "white",
//             padding: "20px",
//             border: "1px solid black",
//             borderRadius: "10px",
//             overflowY: "auto",
//           }}
//         >
//           {children}
//         </div>
//       );
//     } else {
//       return (
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             zIndex: 10,
//             marginTop: dimensions.height * 0.14,
//             height: dimensions.height * 0.88,
//             width: dimensions.width * 0.15,
//             backgroundColor: "white",
//             padding: "20px",
//             border: "1px solid black",
//             borderRadius: "10px",
//             overflowY: "auto",
//           }}
//         >
//           {children}
//         </div>
//       );
//     }
//   };

//   // Effect to listen for window resize events
//   useEffect(() => {
//     function handleResize() {
//       // Update the dimensions in the state
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }

//     const fetchDataApplication = async () => {
//       const response = await fetch(`${backend_url}data`);
//       const data = await response.json();
//       setCircleData(data);
//     };

//     fetchDataApplication().catch(console.error);

//     const fetchDataType = async () => {
//       const response = await fetch(`${backend_url}types`);
//       const data = await response.json();
//       setTypeData(data);
//     };

//     fetchDataType().catch(console.error);

//     // Add event listener
//     window.addEventListener("resize", handleResize);

//     // Cleanup function to remove event listener
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [modalPosition, setModalPosition] = useState({});

//   const handleCircleHover = (index, rect) => {
//     setModalVisible(true);
//     //console.log(circleData[typeData[index]["type_name"]]);
//     //console.log(typeData[index]["type_name"]);
//     setModalContent(circleData[typeData[index]["type_name"]]);
//     setModalPosition({ top: rect.top, left: rect.right }); // Adjust this based on your modal positioning logic
//   };

//   return (
//     <div
//       className="landing_container"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         width: dimensions.width,
//         height: dimensions.height,
//       }}
//     >
//       <CircleAroundImage
//         n={typeData.length}
//         width={dimensions.width}
//         height={dimensions.height}
//         onCircleHover={handleCircleHover}
//         data={typeData}
//       />
//       {isModalVisible && (
//         <Modal position={modalPosition}>
//           <ExpandableList content={modalContent} data={modalContent} />
//         </Modal>
//       )}
//     </div>
//   );
// }
import React from "react";
import "../App.css";

const generateRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const OrbitingCircles = ({ numberOfCircles }) => {
  const angleStep = 360 / numberOfCircles;
  const animations = [];

  for (let i = 0; i < numberOfCircles; i++) {
    const angle = angleStep * i;
    const animationName = `orbit-${i}`;
    const color = generateRandomColor();

    // Generate dynamic keyframes for each circle
    const keyframes = `
      @keyframes ${animationName} {
        from {
          transform: rotate(${angle}deg) translateX(200px) rotate(-${angle}deg);
        }
        to {
          transform: rotate(${360 + angle}deg) translateX(200px) rotate(-${
      360 + angle
    }deg);
        }
      }
    `;
    animations.push(keyframes);

    // Append the generated keyframes to the head
    if (!document.getElementById(animationName)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = animationName;
      styleSheet.innerText = keyframes;
      document.head.appendChild(styleSheet);
    }
  }

  return (
    <div className="solar-system">
      <div className="central-circle"></div>
      {Array.from({ length: numberOfCircles }, (_, i) => {
        const angle = angleStep * i;
        return (
          <div
            className="orbiting-circle"
            key={i}
            style={{
              backgroundColor: generateRandomColor(),
              animationName: `orbit-${i}`,
              animationDuration: "20s",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              transform: `rotateY(${angle}deg) translateX(100px) rotateZ(${angle}deg)`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default OrbitingCircles;

// import React from "react";
// import "../App.css";
// import FlipBook from "../components/Book2";
// const BooksTable = () => {
//   return (
//     <>
//       {/* <div
//         style={{
//           margin: "5vw",
//           justifyContent: "center",
//           alignItems: "center",
//           display: "flex",
//         }}
//       >
//         <Book />
//         <Book />
//         <Book />
//       </div> */}
//       <div
//         style={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           display: "flex",
//           padding: "20px  ",
//         }}
//       >
//         <FlipBook />
//         <FlipBook />
//         <FlipBook />
//       </div>
//       <div
//         style={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           display: "flex",
//           padding: "20px  ",
//         }}
//       >
//         <FlipBook />
//         <FlipBook />
//       </div>
//       <div
//         style={{
//           justifyContent: "space-around",
//           alignItems: "center",
//           display: "flex",
//           padding: "20px  ",
//         }}
//       >
//         <FlipBook />
//         <FlipBook />
//       </div>
//     </>
//   );
// };

// export default BooksTable;
