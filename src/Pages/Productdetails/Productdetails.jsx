import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios/unsafe/axios.js";
import Slider from "react-slick";
import Productcard from "../../Component/Productcard/Productcard";
import { cartcontext } from "../../Context/Cartcontextprovider";
import { WishlistContext } from "../../Context/Wishlistcontextprovider";
import { ChevronLeft, Heart } from "lucide-react";
export default function Productdetails() {
  let { getaddToCart } = useContext(cartcontext);
  let { getaddToWishlist, wishlistlike, removeItemWishlist } =
    useContext(WishlistContext);
  let [product, setProduct] = useState(null);
  let [related, setRelated] = useState(null);
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };
  document.title = "Productsdetails";
  async function getProductData() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProduct(data.data);
      getRelatedProduct(data.data.category._id);
      setMainImage(data.data?.images?.[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getRelatedProduct(categoryid) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryid}`
      );
      setRelated(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, [id]);

  if (loading)
    return (
      <div className="py-8">
        <div className="container mx-auto dark:bg-slate-700 shadow-lg rounded-lg px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Skeleton */}
            <div className="w-full">
              <div className="w-full h-72 rounded-lg bg-gray-200 animate-pulse"></div>
              <div className="py-3 grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 animate-pulse rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Right Skeleton */}
            <div className="w-full space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="h-10 w-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-1 my-12 bg-gray-300 animate-pulse rounded"></div>

          {/* Related Products Skeleton */}
          <div className="h-6 bg-gray-200 w-1/3 rounded animate-pulse mb-4"></div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-4 border rounded shadow-sm bg-white dark:bg-slate-600"
              >
                <div className="h-40 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-1"></div>
                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="py-8 " data-aos="fade-up">
        <button
          onClick={() => navigate(-1)}
          className="bg-main text-white px-4 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
        >
          <ChevronLeft className="hover:scale-120 duration-300" />
        </button>
        <div className="container mx-auto dark:bg-slate-700 dark:text-slate-200 shadow-lg rounded-lg px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <img
                src={product?.imageCover && mainImage}
                alt={product?.title}
                className="w-70 mx-auto h-70 object-cover rounded-lg"
              />
              <div className="py-3">
                <Slider {...settings}>
                  {product?.images.map((img, index) => (
                    <img
                      onClick={() => {
                        setSelectedIndex(index);
                        setMainImage(img);
                      }}
                      key={index}
                      src={img}
                      alt=""
                      className={`h-32 object-cover cursor-pointer mx-auto ${
                        selectedIndex === index
                          ? "border-4 border-secondary"
                          : "border-2 border-transparent"
                      }`}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-3xl font-bold text-main mb-2">
                {product?.title?.split(" ", 2).join(" ")}
              </h1>
              <h2 className="text-xl font-semibold text-secondary mb-2">
                {product?.category?.name}
              </h2>
              <p className="text-sm text-secondary mb-3">
                {product?.description?.split(" ", 15).join(" ")}
              </p>
              <div className="flex items-center mb-4 gap-2">
                <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                  {product?.ratingsAverage} ⭐
                </span>
                <span className="text-sm font-bold text-secondary">
                  {product?.ratingsQuantity} reviews
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                <div>
                  <span className="text-2xl font-bold text-secondary dark:text-white">
                    EGP {product?.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product?.price + 200}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const isInWishlist =
                      Array.isArray(wishlistlike) &&
                      wishlistlike.some((item) => item?._id === product?._id);
                    if (isInWishlist) {
                      removeItemWishlist(product?._id);
                    } else {
                      getaddToWishlist(product?._id);
                    }
                  }}
                  className="bg-main hover:bg-secondary cursor-pointer text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  {Array.isArray(wishlistlike) &&
                  wishlistlike.some((item) => item?._id === product?._id) ? (
                    <i className="fa-solid fa-heart text-red-500 text-xl "></i>
                  ) : (
                    <i className="fa-regular fa-heart text-slate-300 text-xl"></i>
                  )}
                </button>
                <button
                  onClick={() => getaddToCart(product?._id)}
                  className="flex-1 bg-main hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-1 my-12 bg-secondary"></div>
          <h3 className="text-3xl font-extrabold my-5">Related Products</h3>
          <div className="w-1/4 h-1 bg-secondary mb-4"></div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 py-5 ">
            {related?.map((item) => (
              <Productcard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
