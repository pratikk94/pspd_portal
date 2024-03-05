import "../pages/Home.css";
import SophisticatedAccordion from "../components/Accordian";
import CustomAccordion from "../components/CustomAccordian";
export default function Home() {
  const screensData = [
    {
      id: 1,
      image: "https://source.unsplash.com/random/800x600?sig=1",
      items: Array.from({ length: 9 }, (_, i) => `Item ${i + 1}`),
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/800x600?sig=2",
      items: Array.from({ length: 9 }, (_, i) => `Item ${i + 1}`),
    },
    // Add additional screens here
  ];
  return (
    <div style={{ marginLeft: "12vw", marginRight: "12vw" }}>
      <div className="product-feature">
        {/* <div className="product-description">
          <h1>PSPD Portal</h1>
          <p>Ceopluopius</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="product-image">
          <img
            src="https://source.unsplash.com/random/200x200"
            alt="featured product"
          />
        </div> */}
      </div>
      {/* <div style={{ height: "24vh" }}></div> */}
      <div
        style={{
          height: "60vh",
          position: "fixed",
          overflowY: "auto",
          marginTop: "-12vh",
          marginLeft: "12vw",
          marginRight: "12vw",
          marginBottom: "12vh",
        }}
      >
        {/* <SophisticatedAccordion /> */}
        <CustomAccordion />
      </div>
    </div>
  );
}
