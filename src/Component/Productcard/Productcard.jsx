import { Eye, ShoppingCart } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";
import { cartcontext } from "../../../Context/CartContextProvider";

export default function Productcard({ item }) {
  const { getaddToCart } = useContext(cartcontext);
  const { getaddToWishlist, wishlistlike, removeItemWishlist } =
    useContext(WishlistContext);

  const hasDisCount =
    item.priceAfterDiscount && item.priceAfterDiscount < item.price;
  const priceToShow = hasDisCount
    ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100)
    : 0;

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="card shadow-xl duration-300 hover:shadow-2xl rounded-2xl p-4 space-y-5 relative group"
      data-aos="fade-up"
      onClick={() => setIsActive(!isActive)}
    >
      <div className="relative">
        {hasDisCount > 0 && (
          <span className="absolute rounded-full rounded-tl-[50%] top-5 z-11 left-2 bg-main text-yellow-500 text-xs font-bold py-1 px-2">
            -{priceToShow} %{" "}
            <p className="text-secondary font-bold">Sale</p>
          </span>
        )}
      </div>

      <div
        className={`layer z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-between gap-4
          ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
          group-hover:opacity-100 group-hover:translate-y-0
          transition duration-300`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            const isInWishlist =
              Array.isArray(wishlistlike) &&
              wishlistlike.some((product) => product._id === item._id);
            if (isInWishlist) {
              removeItemWishlist(item._id);
            } else {
              getaddToWishlist(item._id);
            }
          }}
          className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-green-800 text-slate-200 p-3 rounded-full"
        >
          {Array.isArray(wishlistlike) &&
          wishlistlike.some((product) => product._id === item._id) ? (
            <i className="fa-solid fa-heart text-red-500 text-xl"></i>
          ) : (
            <i className="fa-regular fa-heart text-slate-300 text-xl"></i>
          )}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            getaddToCart(item?._id);
          }}
          className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-green-800 text-slate-200 p-3 rounded-full"
        >
          <ShoppingCart />
        </div>

        <div
          className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-green-800 text-slate-200 p-3 rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to={`/productdetails/${item?._id}`}>
            <Eye />
          </Link>
        </div>
      </div>

      <img
        src={item.imageCover}
        className="w-full duration-300 hover:scale-105 h-70 object-cover"
        alt={item.title}
      />

      <div className="card-body">
        <Link
          to={`/productdetails/${item?._id}`}
          className="card-title text-secondary font-black"
        >
          {item.title.split(" ", 2).join(" ")}
        </Link>
        <h5 className="card-title text-main font-black">{item.category.name}</h5>
        <span className="card-text text-lg mt-1 text-main font-bold">
          {item.brand.name}:
        </span>
        {item.quantity > 0 ? (
          <span className="text-secondary">Available</span>
        ) : (
          <span className="text-red-600">Sold Out</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-main font-bold">
          Price:{" "}
          <span className="text-secondary font-medium">{item.price} EGP</span>
        </span>
        <div className="flex gap-1">
          <span className="text-yellow-300">⭐</span>
          <span>{item.ratingsAverage}</span>
        </div>
      </div>
    </div>
  );
}
