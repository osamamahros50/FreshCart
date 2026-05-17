import React from "react";

export default function Loadere() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="cart-loader-container">
        <svg className="cart-loader" viewBox="0 0 64 64" fill="none">
          <path
            className="cart-path"
            d="M2 6h8l10 40h32l8-24H16"
            stroke="#00cc74"
            strokeWidth="3"
            fill="none"
          />
          <circle
            className="wheel wheel1"
            cx="24"
            cy="54"
            r="4"
            fill="#00cc74"
          />
          <circle
            className="wheel wheel2"
            cx="48"
            cy="54"
            r="4"
            fill="#00cc74"
          />
        </svg>
        <h2 className="text-main text-3xl font-bold">
          FreshCart{" "}
          <span className="text-secondary text-2xl  ">Is Loading...</span>
        </h2>
      </div>
    </div>
  );
}
