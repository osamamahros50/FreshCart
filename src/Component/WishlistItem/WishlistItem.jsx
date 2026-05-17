import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash } from "lucide-react";
import { cartcontext } from "../../../Context/CartContextProvider";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";

export default function WishlistItem({ item }) {
  let { getaddToCart, dissapled } = useContext(cartcontext);
  let { removeItemWishlist, loading } = useContext(WishlistContext);

  if (loading) {
    return (
      <>
        <div className="p-4 rounded-lg mb-4 flex justify-between items-center animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 dark:bg-slate-700 rounded-2xl"></div>

            <div className="flex flex-col space-y-2">
              <div className="h-5 w-40 bg-gray-300 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-4 w-36 bg-gray-200 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="h-0.5 w-[80%] mx-auto bg-gray-200"></div>
      </>
    );
  }
  return (
    <div>
      <div className="p-4 rounded-lg mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-1 border-secondary">
        <div className="flex flex-col sm:flex-col  lg:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <img
            className="w-full sm:w-100 h-100 lg:w-50 lg:h-50 object-cover rounded-2xl"
            src={item?.imageCover}
            alt={item.title}
          />
          <div className="flex flex-col space-y-2">
            <Link to={`/productdetails/${item?._id}`}>
              <h3 className="text-xl font-bold text-secondary">
                {item?.title?.split(" ", 2).join(" ")}
              </h3>
            </Link>
            <span className="text-main font-bold dark:text-slate-200">
              Rate : ⭐{" "}
              <span className="text-secondary font-bold">
                {item?.ratingsAverage}
              </span>
            </span>
            <span className="text-main font-bold dark:text-slate-200">
              Price :{" "}
              <span className="text-secondary font-bold">
                EGP {item?.price}
              </span>
            </span>
            <span className="text-main font-bold dark:text-slate-200">
              {item?.category?.name} | {item?.brand?.name} |
              <span className="text-secondary font-bold ml-1">
                {item.quantity > 0 ? (
                  <span className="text-green-600">Available</span>
                ) : (
                  <span className="text-red-600">Sold Out</span>
                )}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
          <button
            disabled={dissapled}
            onClick={() => getaddToCart(item._id)}
            className="btn  bg-secondary flex items-center justify-center gap-1 w-full sm:w-auto"
          >
            <ShoppingCart className="hvr-buzz-out" />
            Add To Cart
          </button>
          <button
            disabled={dissapled}
            onClick={() => removeItemWishlist(item._id)}
            className="  btn bg-red-500 flex items-center justify-center gap-1 w-full sm:w-auto"
          >
            <Trash className="hvr-bounce-in" />
            Remove
          </button>
        </div>
      </div>

      <div className="h-0.5 w-[80%] mx-auto bg-slate-200 dark:bg-secondary"></div>
    </div>
  );
}
