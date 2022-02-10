import React from "react";

export default function Loading() {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#0008",
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
}
