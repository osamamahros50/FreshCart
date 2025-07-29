import { useContext } from "react";
import Cartitem from "../../Component/Cartitem/CArtitem";
import { useEffect } from "react";
import Checkout from "../../Component/Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cartcontext } from "../../../Context/CartContextProvider";
export default function Cart() {
  let { cart, loading, getLogedCart, clearCart } = useContext(cartcontext);
  const navigate = useNavigate();
  useEffect(() => {
    getLogedCart();
  }, []);
  if (loading) {
    return (
      <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 p-5 animate-pulse">
        <div className="mb-10 h-8 w-48 mx-auto bg-gray-300 dark:bg-slate-600 rounded-lg" />

        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 flex flex-col">
          {/* Cart Items Skeleton */}
          <div className="rounded-lg md:w-full space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-4 shadow-md flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-40 h-40 bg-gray-300 dark:bg-slate-600 rounded-lg" />
                <div className="flex flex-col sm:flex-col lg:flex-row justify-between gap-4 w-full">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-4 w-1/2 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-4 w-1/3 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-4 w-1/4 bg-gray-300 dark:bg-slate-600 rounded" />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 w-full sm:w-auto">
                    <div className="h-8 w-32 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-10 w-10 bg-gray-300 dark:bg-slate-600 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal Skeleton */}
          <div className="mt-6 h-full rounded-lg border bg-white dark:bg-slate-700 p-6 shadow-md md:mt-0 md:w-full">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-28 rounded-md bg-gray-300 dark:bg-slate-600" />
            </div>
            <hr className="my-3 text-main" />
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-slate-600 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }
  document.title = "Cart";
  return (
    <div className=" bg-slate-200 dark:bg-slate-700 dark:text-slate-200  p-5 ">
      <button
        onClick={() => navigate(-1)}
        className="bg-main text-white px-4 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
      >
        <ChevronLeft className="hover:scale-120 duration-300" />
      </button>
      <h1 className="mb-10 text-center text-secondary text-2xl font-bold">
        Cart Items
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 flex flex-col ">
        <div className="rounded-lg md:w-full">
          {cart?.data?.products.map((item) => (
            <Cartitem key={item?._id} item={item} />
          ))}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full  rounded-lg border bg-white   dark:bg-slate-700 dark:text-slate-200 p-6 shadow-md md:mt-0 md:w-full">
          <div className="flex justify-center">
            <button
              onClick={clearCart}
              className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-101 duration-300 hover:from-[#be123c] hover:to-[#fb7185] sm:w-1/8"
            >
              clear
            </button>
          </div>
          <hr className="my-3 text-main" />
          <div>
            <Checkout totalPrice={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
