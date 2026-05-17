import React, { useContext, useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { cartcontext } from "../../../Context/CartContextProvider";

export default function Cartitem({ item }) {
  console.log(item);
  let { removeItemcart, updateCartItem, dissapled } = useContext(cartcontext);
  let [count, setCount] = useState(item?.count);
  function updateCount() {
    if (count == item?.count) {
      return;
    }
    updateCartItem(item?.product?._id, count);
  }

  useEffect(() => {
    setCount(item?.count);
  }, [item?.count]);

  return (
    <div className="mb-6 hover:scale-[1.02] duration-300 group rounded-lg border border-secondary bg-white dark:bg-slate-700 p-4 shadow-md flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <img
        src={item?.product?.imageCover}
        alt="product-image"
        className="w-full sm:w-40 h-40 object-cover rounded-lg group-hover:scale-105 duration-300"
      />

      {/* Content Area */}
      <div className="flex flex-col sm:flex-col lg:flex-row justify-between gap-4 w-full">
        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h2 className="text-lg font-bold text-secondary">
            {item?.product?.title?.split(" ", 2).join(" ") || "No Title"}
          </h2>
          <p className="font-bold text-main dark:text-slate-200">
            Brand:{" "}
            <span className="font-medium text-secondary">
              {item?.product?.brand?.name}
            </span>
          </p>
          <p className="font-bold text-main dark:text-slate-200">
            Rate: ⭐{" "}
            <span className="font-medium text-secondary">
              {item?.product?.ratingsAverage}
            </span>
          </p>
          <p className="font-bold text-main dark:text-slate-200">
            Price:{" "}
            <span className="font-medium text-secondary">{item?.price}</span>
          </p>
        </div>

        {/* Quantity + Delete */}
        <div className="flex flex-col sm:flex-row justify-between  sm:items-center gap-10 w-full sm:w-auto">
          {/* Quantity Controls */}
          <div className="flex items-center  border-gray-200 border-2 rounded-2xl py-2 px-2 ">
            <button
              disabled={dissapled}
              onClick={() =>
                updateCartItem(item?.product?._id, item?.count - 1)
              }
              className="disabled:cursor-not-allowed text-secondary font-bold cursor-pointer rounded-l bg-gray-100 dark:text-secondary dark:bg-slate-700 py-1 px-3.5 hover:bg-secondary hover:text-white transition"
            >
              -
            </button>
            <input
              onChange={(e) => setCount(e.target.value)}
              onBlur={updateCount}
              className="h-8 sm:w-20 border-0 focus:border-secondary focus:border rounded-full focus:duration-300 bg-white text-center dark:text-secondary dark:bg-slate-700 text-xs outline-none"
              type="number"
              value={count}
              min={1}
            />
            <button
              disabled={dissapled}
              onClick={() =>
                updateCartItem(item?.product?._id, item?.count + 1)
              }
              className="disabled:cursor-not-allowed text-secondary font-bold cursor-pointer  bg-gray-100 py-1 px-3 dark:text-secondary dark:bg-slate-700 hover:bg-secondary hover:text-white transition"
            >
              +
            </button>
          </div>

          {/* Delete + Total */}
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <p className="font-bold text-main">
              Total Price:{" "}
              <span className="text-secondary font-medium">
                {item?.price * item?.count} ₭
              </span>
            </p>
            <button
              onClick={() => removeItemcart(item?.product?._id)}
              className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-101 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
            >
              <Trash />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
