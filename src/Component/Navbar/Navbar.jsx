/* eslint-disable no-unused-vars */
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  LogOut,
  Menu,
  MoonStar,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";
import { useContext, useEffect, useState } from "react";
import { cartcontext } from "../../Context/Cartcontextprovider";
import { WishlistContext } from "../../Context/Wishlistcontextprovider";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar({ changeTheme, theme }) {
  let { token, setToken } = useContext(authContext);
  const [animateCart, setAnimateCart] = useState(false);
  const [animatewish, setAnimatewish] = useState(false);
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  let { cart } = useContext(cartcontext);
  let { wishlist } = useContext(WishlistContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);
  let [counter2, setCounter2] = useState(wishlist?.data?.length);

  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);
  useEffect(() => {
    if (counter > 0) {
      setAnimateCart(true);
      setTimeout(() => {
        setAnimateCart(false);
      }, 300);
    }
  }, [counter]);
  useEffect(() => {
    if (counter2 > 0) {
      setAnimatewish(true);
      setTimeout(() => {
        setAnimatewish(false);
      }, 300);
    }
  }, [counter2]);
  useEffect(() => {
    setCounter2(wishlist?.data?.length);
  }, [wishlist]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="p-5 fixed top-0 w-full z-50 bg-slate-200 shadow-xl dark:bg-slate-800 dark:text-slate-200  transition-all duration-300 ease-in-out">
      <div className="container flex justify-between  items-center ">
        {/* Links Pages */}
        <h1>
          <NavLink to={"/home"}>
            <i className="fa-brands fa-opencart text-secondary mr-2 text-3xl"></i>
            <span className="text-3xl font-bold text-main">Fresh Cart</span>
          </NavLink>
        </h1>
        <ul className="hidden lg:flex justify-center items-center space-x-5 ">
          {token ? (
            <>
              <li className="text-xl  navhover navafter ">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/home"}
                >
                  Home
                </NavLink>
              </li>
              <li className="text-xl navhover navafter">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/product"}
                >
                  Product
                </NavLink>
              </li>
              <li className="text-xl navhover navafter">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/categories"}
                >
                  Categories
                </NavLink>
              </li>
              <li className="text-xl navhover navafter">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/brands"}
                >
                  Brands
                </NavLink>
              </li>
              <li className="text-xl navhover navafter">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/orders"}
                >
                  Orders
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>

        {/* autoh Links */}
        <ul className="hidden lg:flex justify-between items-center space-x-3">
          {!token ? (
            <>
              <li className="text-xl cursor-pointer">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li className="text-xl cursor-pointer">
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/regester"}
                >
                  Regester
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li
                className={`hover:-translate-y-2  text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 ${
                  animateCart ? "animate-bounce" : ""
                }`}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/cart"}
                >
                  <ShoppingCart />
                </NavLink>
                {counter > 0 && (
                  <div className="bg-secondary size-5  text-white text-center rounded-full absolute -top-4 -left-4 text-sm">
                    {cart?.numOfCartItems}
                  </div>
                )}
              </li>
              <li
                className={`hover:-translate-y-2   text-xl font-semibold cursor-pointer link-hover relative  transition-all duration-300 ${
                  animatewish ? "animate-bounce" : ""
                } `}
              >
                <NavLink
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                  to={"/wishlist"}
                >
                  <Heart />
                </NavLink>
                {counter2 > 0 && (
                  <div className="bg-secondary text-white size-5 text-center rounded-full absolute -top-4 -left-3 text-sm">
                    {counter2}
                  </div>
                )}
              </li>
              <li
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/?locale=ar_AR",
                    "_blank"
                  )
                }
                className={`hover:-translate-y-2  text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 `}
              >
                <span className="text-blue-700">
                  <Facebook />
                </span>
              </li>
              <li
                onClick={() =>
                  window.open("https://www.instagram.com/", "_blank")
                }
                className={`hover:-translate-y-2  text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 `}
              >
                <span className="text-red-700">
                  <Instagram />
                </span>
              </li>
              <li
                onClick={() => window.open("https://x.com/", "_blank")}
                className={`hover:-translate-y-2  text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 `}
              >
                <span className="">
                  <i class="fa-brands fa-x-twitter"></i>
                </span>
              </li>
              <li
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/osama-mahros-b45498343",
                    "_blank"
                  )
                }
                className={`hover:-translate-y-2  text-xl font-semibold cursor-pointer link-hover relative transition-all duration-300 `}
              >
                <span className="text-blue-700 ">
                  <Linkedin />
                </span>
              </li>
              <li onClick={logOut} className="text-xl cursor-pointer">
                <span>
                  <LogOut />
                </span>
              </li>
            </>
          )}

          <li
            className="btn bg-slate-700  hover:bg-slate-900 dark:hover:bg-slate-500 flex justify-center items-center rounded-xl"
            onClick={changeTheme}
          >
            {theme == "light" ? <MoonStar /> : <Sun />}
          </li>
        </ul>
        <div className="btn lg:hidden" onClick={toggleMobileMenu}>
          <Menu />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-slate-200 dark:bg-slate-800"
          >
            <div className="container px-4 py-6">
              {/* Links Pages */}
              <ul className="flex flex-col gap-6 mb-6 ">
                {token && (
                  <>
                    <li className="text-xl navhover">
                      <NavLink
                        to="/home"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="text-xl navhover">
                      <NavLink
                        to="/product"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        Product
                      </NavLink>
                    </li>
                    <li className="text-xl navhover">
                      <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li className="text-xl navhover">
                      <NavLink
                        to="/brands"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        Brands
                      </NavLink>
                    </li>
                    <li className="text-xl navhover">
                      <NavLink
                        to="/orders"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        Orders
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              {/* Auth Links */}
              <ul className="flex flex-col justify-center gap-5">
                {!token ? (
                  <>
                    <li className="text-xl cursor-pointer">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="text-xl cursor-pointer">
                      <Link to="/regester">Regester</Link>
                    </li>
                  </>
                ) : (
                  <li onClick={logOut} className="text-xl cursor-pointer">
                    <span>
                      <LogOut />
                    </span>
                  </li>
                )}

                <li
                  className="btn bg-slate-700 w-fit hover:bg-slate-900 dark:hover:bg-slate-500 flex justify-center items-center rounded-xl"
                  onClick={changeTheme}
                >
                  {theme === "light" ? <MoonStar /> : <Sun />}
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
