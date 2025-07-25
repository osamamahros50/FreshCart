import axios from "axios";
import React from "react";
import Allorders from "../../Component/Allorders/Allorders";
import Loadere from "../../Component/Loader/Loadere";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
const displayOrders = async () => {
  const userId = localStorage.getItem("userId");
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
  );
  return data;
};

export default function Orders() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: displayOrders,
  });

  if (isLoading) return <Loadere />;

  if (isError)
    return (
      <div className="text-red-600 text-center mt-10">
        Error: {error.message}
      </div>
    );
  document.title = "Order";
  return (
    <div className="bg-slate-200 dark:bg-slate-700 dark:text-slate-200 rounded-lg text-2xl mt-20">
      <h3 className="text-center py-3 font-bold text-secondary">All Orders</h3>
      <div className="h-1 bg-secondary w-1/4 mx-auto"></div>

      {data.length === 0 ? (
        <div className="text-center h-screen mt-50 text-red-500 font-semibold my-10 text-xl">
          don't have any orders yet
        </div>
      ) : (
        <>
          <div className="flex gap-5">
            <button
              onClick={() => navigate(-1)}
              className="bg-main text-white px-4 ml-5 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
            >
              <ChevronLeft className="hover:scale-120 duration-300 " />
            </button>
            <p className="text-secondary font-bold">Track your orders:</p>
          </div>
          <p className="ml-5 mt-5 font-bold text-main ">
            Number of Orders:{" "}
            <span className="text-secondary">{data.length}</span>
          </p>
          <div className="mx-4 grid grid-cols-1 gap-4">
            {data.map((item) => (
              <div key={item._id} className="rounded-lg p-4">
                <Allorders item={item} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
