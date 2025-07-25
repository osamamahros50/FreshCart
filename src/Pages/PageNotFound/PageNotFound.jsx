import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/error.svg";
export default function PageNotFound() {
  document.title = "PageNotFound";
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white  text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 ">404</h1>
      <p className="text-3xl text-secondary font-bold ">Page Not Found</p>
      <img src={img} alt="" />
      <Link
        to="/"
        className="px-6 py-2 bg-main hover:bg-secondary text-white rounded hover:bg-opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
