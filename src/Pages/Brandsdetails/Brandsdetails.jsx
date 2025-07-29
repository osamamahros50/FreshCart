import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loadere from "../../Component/Loader/Loadere";
import { ChevronLeft, Eye, ShoppingCart, Star } from "lucide-react";
import ProductNotFound from "../ProductNotFound/ProductNotFound";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";
import { cartcontext } from "../../../Context/CartContextProvider";

export default function Brandsdetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null); // ← لتفعيل الكرت بالموبايل

  const { getaddToCart } = useContext(cartcontext);
  const { getaddToWishlist, wishlistlike, removeItemWishlist } =
    useContext(WishlistContext);
  const navigate = useNavigate();

  async function getProductsByBrand() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products by brand", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductsByBrand();
  }, [id]);

  document.title = "Brandsdetails";

  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold mb-3 text-center text-green-400">
        Products of This Brand
      </h2>
      <div className="mb-10">
        <div className="bg-green-400 h-0.5 w-1/3 m-auto"></div>
        <div className="bg-green-400 h-0.5 my-2 w-1/4 m-auto"></div>
        <div className="bg-green-400 h-0.5 w-1/3 m-auto"></div>
      </div>

      {loading ? (
        <Loadere />
      ) : products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="bg-main text-white px-4 my-5 ml-5 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
          >
            <ChevronLeft />
          </button>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => {
              const isActive = activeCardId === product._id;
              const isInWishlist =
                Array.isArray(wishlistlike) &&
                wishlistlike.some((w) => w && w._id === product._id);

              return (
                <div
                  key={product._id}
                  onClick={() =>
                    setActiveCardId(
                      activeCardId === product._id ? null : product._id
                    )
                  }
                  data-aos="fade-up"
                  className="rounded shadow p-3 hover:shadow-md transition bg-white dark:bg-slate-700 dark:text-slate-200 hover:border-2 hover:border-secondary duration-200 relative group cursor-pointer"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-48 w-full object-contain mb-3"
                  />

                  <div
                    className={`layer absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-between gap-6 z-10
                    ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    }
                    group-hover:opacity-100 group-hover:translate-y-0
                    transition duration-300`}
                  >
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist) {
                          removeItemWishlist(product._id);
                        } else {
                          getaddToWishlist(product._id);
                        }
                      }}
                      className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-green-800 text-slate-200 p-3 rounded-full"
                    >
                      {isInWishlist ? (
                        <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                      ) : (
                        <i className="fa-regular fa-heart text-slate-300 text-xl"></i>
                      )}
                    </div>

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        getaddToCart(product._id);
                      }}
                      className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-main text-slate-200 p-3 rounded-full"
                    >
                      <ShoppingCart />
                    </div>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="icon hover:animate-bounce bg-secondary cursor-pointer hover:bg-main text-slate-200 p-3 rounded-full"
                    >
                      <Link to={`/productdetails/${product._id}`}>
                        <Eye />
                      </Link>
                    </div>
                  </div>

                  <h3 className="text-md font-bold text-main mb-2">
                    {product.category.name}
                  </h3>
                  <h3 className="text-md font-bold mb-2 text-secondary">
                    {product.title.split(" ", 1).join(" ")}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-main font-semibold">
                      {product.price}{" "}
                      <span className="text-secondary">EGP</span>
                    </p>
                    <div className="flex gap-1">
                      <Star className="text-yellow-300" />
                      <span className="text-secondary">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
