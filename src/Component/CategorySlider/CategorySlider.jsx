/* eslint-disable no-undef */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  let [categories, setcategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      console.log(data.data);
      setcategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <h2 className="text-main font-bold text-center md:text-2xl ml-3 my-3">
        Shope now by popular categories
      </h2>
      <div className="bg-green-400 h-0.5  mb-5 w-1/4 m-auto"></div>

      <div className=" mb-12 ">
        <Slider {...settings}>
          {categories.map((item) => (
            <div key={item._id} className="text-center">
              <img
                src={item.image}
                alt={item.name}
                className=" h-[200px] w-full object-cover"
              />
              <h4 className=" font-bold text-secondary mt-2 bg-slate-100 dark:bg-slate-600">
                {item.name}
              </h4>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
