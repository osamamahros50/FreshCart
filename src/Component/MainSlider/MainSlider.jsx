import slide1 from "../../assets/images/product4-CxeAzYXu.jpg";
import slide2 from "../../assets/images/product5-DZxbnV6L.jpg";
import mainslide1 from "../../assets/images/product2-Cc8hawmZ.jpg";
import mainslide2 from "../../assets/images/imgi_32_photo-1487744480471-9ca1bca6fb7d.jpg";
import mainslide3 from "../../assets/images/imgi_34_product3-CjkhanyU.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider({ onShopNowClick }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ padding: "50px" }}>
        <ul style={{ display: "flex", justifyContent: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full mx-1 transition-all duration-300" />
    ),
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-1 ">
        <div className="w-full lg:w-3/4">
          <Slider {...settings}>
            <div className="relative">
              <img
                src={mainslide2}
                alt="Main Slide 2"
                className="w-full h-[600px]"
              />
              <div className="p-10 bg-gradient-to-b to-transparent absolute top-5 left-0 h-full z-10">
                <div className="bg-amber-50 p-2 rounded-3xl w-fit">
                  <i className="fa-brands fa-opencart text-secondary mr-2 text-4xl"></i>
                  <span className="text-4xl font-bold text-main">
                    Fresh Cart
                  </span>
                </div>
                <p className="text-sm text-white font-semibold max-w-xl mt-4 shadow-inner bg-white/20 p-5 rounded-lg">
                  Whether you’re looking for the freshest produce, pantry
                  staples, or specialty items, FreshCart brings the supermarket
                  to you, redefining the way you shop for groceries.
                </p>
                <button
                  onClick={onShopNowClick}
                  className="cursor-pointer m-5 bg-secondary hover:bg-main text-white px-6 py-2 font-bold shadow w-fit transition rounded-2xl"
                >
                  Get Started
                </button>
                <div></div>
              </div>
            </div>
            <div>
              <img
                src={mainslide1}
                alt="Main Slide 1"
                className="w-full h-[600px]"
              />
            </div>
            <div>
              <img
                src={mainslide3}
                alt="Main Slide 3"
                className="w-full h-[600px]"
              />
            </div>
          </Slider>
        </div>

        <div className="w-full lg:w-1/4 mt-1 lg:mt-0">
          <div className="flex flex-col sm:flex-row lg:flex-col gap-1">
            <img
              src={slide1}
              alt="Slide 1"
              className="w-full  sm:w-1/2 lg:w-full h-[300px]"
            />
            <img
              src={slide2}
              alt="Slide 2"
              className="w-full sm:w-1/2 lg:w-full h-[300px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
