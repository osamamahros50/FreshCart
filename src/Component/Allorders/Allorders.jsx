import { Trash } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";
export default function Allorders({ item }) {
  let { loading } = useContext(WishlistContext);

  if (loading) {
    return (
      <>
        <div className="p-4 rounded-lg mb-4 flex justify-between items-center relative animate-pulse">
          <div>
            <div className="h-4 w-48 bg-gray-300 rounded mb-4 mt-5"></div>
            <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-36 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-44 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-2 pb-4"
              >
                <div className="h-[50px] w-[50px] bg-gray-300 rounded-md"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-end gap-4">
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
            <div className="bg-gray-200 p-2 rounded-lg shadow-md mt-4 absolute top-2 right-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="h-0.5 w-[80%] mx-auto bg-slate-200"></div>
      </>
    );
  }
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6  dark:bg-slate-700  space-y-6 border border-secondary">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 bg-slate-200 dark:bg-slate-700 dark:shadow-2xl p-4 rounded">
          <p className="text-main font-bold text-base lg:text-lg">
            Transaction Number:
            <span className="text-secondary"> #{item?.id}</span>
          </p>
          <p className="text-main font-bold text-base lg:text-lg">
            Placed on:
            <span className="text-secondary">
              {" "}
              {new Date(item?.updatedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-main font-bold text-base lg:text-lg">
            Payment:
            <span className="text-secondary"> {item?.paymentMethodType}</span>
          </p>
          <Link
            to={"/product"}
            className="btn bg-main w-fit hover:bg-secondary duration-300 text-base lg:text-lg"
          >
            Add New item
          </Link>
        </div>

        {/* Items */}
        <div className="flex flex-col items-start  gap-5">
          {item?.cartItems?.map((cartItem, index) => (
            <div
              key={index}
              className="flex  flex-col md:flex-row items-start md:items-center gap-8 bg-slate-50 dark:bg-slate-700 dark:shadow-2xl p-3 rounded-md"
            >
              <img
                className="h-[100px] w-[100px] object-cover bg-amber-50 shadow rounded"
                src={cartItem?.product?.imageCover}
                alt={cartItem?.product?.title || "Product"}
              />
              <div className="flex flex-col text-left">
                <p className="text-secondary text-lg font-bold">
                  {cartItem.product?.title?.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="text-main font-bold text-sm md:text-base">
                  Price:{" "}
                  <span className="text-secondary">EGP {cartItem?.price}</span>
                </p>
                <p className="text-main font-bold text-sm md:text-base">
                  Quantity:{" "}
                  <span className="text-secondary">{cartItem?.count}</span>
                </p>
                <p className="text-main font-bold text-sm md:text-base">
                  Category:
                  <span className="text-secondary">
                    {" "}
                    {cartItem?.product.category?.name}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-slate-100 dark:bg-slate-700 dark:shadow-2xl p-4 rounded-md shadow-md mt-2">
          <p className="text-main font-bold text-base lg:text-lg mb-2">
            Products Quantity:
            <span className="text-secondary"> {item?.cartItems.length}</span>
          </p>
          <p className="text-main font-bold text-base lg:text-lg mb-2">
            Shipping Price:
            <span className="text-secondary"> EGP {item?.shippingPrice}</span>
          </p>
          <p className="text-main font-bold text-base lg:text-lg mb-2">
            Tax Price:
            <span className="text-secondary"> EGP {item?.taxPrice}</span>
          </p>
          <p className="text-main font-bold text-base lg:text-lg">
            Total Order Price:
            <span className="text-secondary"> EGP {item?.totalOrderPrice}</span>
          </p>
        </div>
      </div>
    </>
  );
}
