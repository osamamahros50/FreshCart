import axios from "axios/unsafe/axios.js";
import Loadere from "../../Component/Loader/Loadere";
import Categorycard from "../../Component/Categorycard/Categorycard";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  let { data, isLoading, error } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    },
  });
  document.title = "Categories";
  return (
    <div>
      <div className=" py-5">
        {isLoading ? (
          <Loadere />
        ) : error ? (
          <h3 className="text-8xl text-red-700 text-center">
            there are no Products
          </h3>
        ) : (
          <>
            <div className="my-5">
              <div className="h-1 bg-secondary w-1/2 sm:w-1/3 md:w-1/4 mx-auto mb-2"></div>
              <h3 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold text-secondary">
                Shop by Categories
              </h3>
              <div className="h-1 bg-secondary w-1/2 sm:w-1/3 md:w-1/4 mx-auto mt-2"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.data.data.map((item) => (
                <Categorycard item={item} key={item._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
