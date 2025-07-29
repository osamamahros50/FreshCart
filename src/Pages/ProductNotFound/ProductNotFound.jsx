import React from "react";
import imge from "../../assets/images/productNotfound.png";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
export default function ProductNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-main text-white px-4 my-5 ml-5 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
      >
        <ChevronLeft className="hover:scale-120 duration-300" />
      </button>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Product Not Found</h1>
        <img src={imge} alt="" />
      </div>
    </>
  );
}
