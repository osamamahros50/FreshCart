import Productcard from "../../Component/Productcard/Productcard";
import axios from "axios/unsafe/axios.js";
import Loadere from "../../Component/Loader/Loadere";
import CategorySlider from "../../Component/CategorySlider/CategorySlider";
import MainSlider from "../../Component/MainSlider/MainSlider";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
export default function Home() {
  let { data, isLoading, error } = useQuery({
    queryKey: ["Home"],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    },
  });

  const productRef = useRef(null);

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  document.title = "Home";
  return (
    <>
      <div>
        <div className="container  dark:text-slate-200">
          {isLoading ? (
            <Loadere />
          ) : error ? (
            <>
              <h3 className="text-8xl text-secondary text-center">Whoopps!</h3>
              <h3 className="text-8xl text-secondary text-center">
                No internet connection found.
              </h3>
              <h3 className="text-8xl text-secondary text-center">
                Please check your connection or try again
              </h3>
            </>
          ) : (
            <>
              <MainSlider onShopNowClick={scrollToProduct} />
              <CategorySlider />
              <div className="my-5" ref={productRef}>
                <h2 className="text-main font-bold text-center md:text-3xl  my-3 dark:text-main">
                  Shop now by popular products
                </h2>
                <div className="h-1 bg-secondary w-1/4 mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
                {data.data.data.map((item) => (
                  <Productcard item={item} key={item._id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
