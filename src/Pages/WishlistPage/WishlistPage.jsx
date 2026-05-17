import React, { useContext, useEffect } from "react";
import WishlistItem from "../../Component/WishlistItem/WishlistItem";
import Loadere from "../../Component/Loader/Loadere";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";
export default function WishlistPage() {
  const { wishlist, getLogedWishlist, loading } = useContext(WishlistContext);

  const navigate = useNavigate();
  useEffect(() => {
    getLogedWishlist();
  }, []);

  if (loading) {
    return <Loadere />;
  }
  document.title = "WishList";
  return (
    <div>
      <div className="grid grid-cols-1 bg-slate-200 dark:bg-slate-700 shadow my-10 rounded-2xl">
        <button
          onClick={() => navigate(-1)}
          className="bg-main text-white px-4 mt-5 ml-5 py-2 rounded-2xl w-fit hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
        >
          <ChevronLeft className="hover:scale-120 duration-300" />
        </button>
        <h2 className="text-3xl font-family font-bold p-4 text-secondary">
          Favorite Products💚
        </h2>
        {wishlist?.data?.map((item) => (
          <WishlistItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
