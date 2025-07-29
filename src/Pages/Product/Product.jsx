import React, { useState } from "react";
import Productcard from "../../Component/Productcard/Productcard";
import axios from "axios/unsafe/axios.js";
import Loadere from "../../Component/Loader/Loadere";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const displayProducts = async (page) => {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
  );
  return data;
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => displayProducts(currentPage),
    keepPreviousData: true,
  });

  const filteredProducts = search
    ? data?.data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data || [];
  document.title = "Products";
  return (
    <div>
      <div className="py-5 dark:text-slate-200">
        {isLoading ? (
          <Loadere />
        ) : isError ? (
          <h3 className="text-8xl text-red-700 text-center">
            There are no Products
          </h3>
        ) : (
          <>
            <button
              onClick={() => navigate(-1)}
              className="bg-main text-white px-4 ml-2 py-2 rounded-2xl hover:bg-secondary cursor-pointer hover:scale-105 duration-300"
            >
              <ChevronLeft className="hover:scale-110 duration-300" />
            </button>

            <form className="w-full max-w-6xl mx-auto mb-6 mt-5 ml-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-32 focus:w-full transition-all shadow-2xl text-secondary duration-500 border border-secondary rounded-full py-2 pr-10 pl-8 focus:outline-none focus:ring-2 focus:ring-main"
                />
                {search === "" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                    <i className="fas fa-search"></i>
                  </span>
                )}
              </div>
            </form>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Productcard item={item} key={item._id} />
                ))
              ) : (
                <div className="w-full h-screen col-span-full flex justify-center items-center">
                  <p className="text-5xl w-full text-secondary text-center">
                    No Products Found
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!isLoading && data && (
        <div className="flex justify-center gap-4 items-center py-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="bg-secondary hover:bg-main text-white p-2 rounded disabled:opacity-50"
          >
            <ChevronLeft />
          </button>

          <span className="font-semibold text-main">
            Page {currentPage} of {data.metadata?.numberOfPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                p < data.metadata?.numberOfPages ? p + 1 : p
              )
            }
            disabled={currentPage === data.metadata?.numberOfPages}
            className="bg-secondary hover:bg-main text-white p-2 rounded disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
