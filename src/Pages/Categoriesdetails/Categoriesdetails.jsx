import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loadere from "../../Component/Loader/Loadere";
import { ChevronLeft, Eye, ShoppingCart, Star } from "lucide-react";
import ProductNotFound from "../ProductNotFound/ProductNotFound";
import { WishlistContext } from "../../../Context/Wishlistcontextprovider";
import { cartcontext } from "../../../Context/CartContextProvider";

export default function Categoriesdetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  let { getaddToCart } = useContext(cartcontext);
  let { getaddToWishlist, wishlistlike, removeItemWishlist } =
    useContext(WishlistContext);
  const navigate = useNavigate();

  async function getProductsByBrand() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
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

  document.title = "Categoriesdetails";

  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold mb-3 text-center text-green-400">
        Category of This Brand
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
            className="bg-main text-white px-4 m-5 ml-5 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
          >
            <ChevronLeft className="hover:scale-120 duration-300" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                data-aos="fade-up"
                className="relative group rounded shadow p-3 hover:shadow-md transition bg-white dark:bg-slate-700 dark:text-slate-200 hover:border-2 hover:border-secondary"
              >
                <div className="relative">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-48 w-full object-contain mb-3"
                  />

                  <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-4 md:opacity-0 md:translate-y-20 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition">
                    <div
                      onClick={() => {
                        const isInWishlist =
                          Array.isArray(wishlistlike) &&
                          wishlistlike.some(
                            (w) => w && w._id === product._id
                          );
                        if (isInWishlist) {
                          removeItemWishlist(product._id);
                        } else {
                          getaddToWishlist(product._id);
                        }
                      }}
                      className="bg-secondary hover:bg-green-800 text-white p-3 rounded-full cursor-pointer hover:animate-bounce"
                    >
                      {Array.isArray(wishlistlike) &&
                      wishlistlike.some(
                        (w) => w && w._id === product._id
                      ) ? (
                        <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                      ) : (
                        <i className="fa-regular fa-heart text-white text-xl"></i>
                      )}
                    </div>

                    <div
                      onClick={() => getaddToCart(product._id)}
                      className="bg-main hover:bg-green-800 text-white p-3 rounded-full cursor-pointer hover:animate-bounce"
                    >
                      <ShoppingCart />
                    </div>

                    <Link
                      to={`/productdetails/${product._id}`}
                      className="bg-main hover:bg-green-800 text-white p-3 rounded-full cursor-pointer hover:animate-bounce"
                    >
                      <Eye />
                    </Link>
                  </div>
                </div>

                <h3 className="text-md font-bold text-main mb-1">
                  {product.category.name}
                </h3>
                <h3 className="text-md text-secondary font-bold mb-2">
                  {product.title.split(" ", 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-main font-semibold">
                    {product.price} <span className="text-secondary">EGP</span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-300 w-4 h-4" />
                    <span className="text-secondary text-sm">
                      {product.ratingsAverage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
