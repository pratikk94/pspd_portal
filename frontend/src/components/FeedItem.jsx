import React from "react";

const InstagramPost = () => {
  return (
    <div
      style={{
        border: "1px solid #dbdbdb",
        borderRadius: "3px",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
        <div
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            backgroundColor: "#c7c7c7",
            marginRight: "10px",
          }}
        ></div>
        <span style={{ fontWeight: "bold" }}>eloeoars</span>
        <button
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ...
        </button>
      </div>
      <img
        src="https://source.unsplash.com/random/800x800"
        alt="Post"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <div style={{ padding: "16px" }}>
        <div style={{ marginBottom: "8px" }}>
          <strong>Liked by</strong> kenzoere and others
        </div>
        <div>
          <strong>photosbyean</strong> Good times. Great vibes.
        </div>
      </div>
    </div>
  );
};

export default InstagramPost;
