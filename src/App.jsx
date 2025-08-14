import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login/Login";
import Regester from "./Pages/Authentication/Regester/Regester";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Forgetpassword from "./Pages/Authentication/Forgetpassword/Forgetpassword";
import VerifyResetCode from "./Pages/Authentication/VerifyResetCode/VerifyResetCode";
import Resetpassword from "./Pages/Authentication/Resetpassword/Resetpassword";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import Orders from "./Pages/Orders/Orders";
import Product from "./Pages/Product/Product";
import ProtectRoureProvider from "./Protect/ProtectRoureProvider";
import Productdetails from "./Pages/Productdetails/Productdetails";
import LoginProtected from "./Protect/Loginprotected";
import Cart from "./Pages/Cart/Cart";
import Brandsdetails from "./Pages/Brandsdetails/Brandsdetails";
import Categoriesdetails from "./Pages/Categoriesdetails/Categoriesdetails";
import WishlistPAge from "./Pages/WishlistPage/WishlistPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import AuthContextProvider from "../Context/AuthContextProvider";
import WishlistContextProvider from "../Context/Wishlistcontextprovider";
import CartContextProvider from "../Context/CartContextProvider";
import Allorders from "./Component/Allorders/Allorders";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoureProvider>
              <Home />
            </ProtectRoureProvider>
          ),
        },

        {
          path: "home",
          element: (
            <ProtectRoureProvider>
              <Home />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectRoureProvider>
              <Product />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectRoureProvider>
              <Productdetails />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "brandsdetails/:id",
          element: (
            <ProtectRoureProvider>
              <Brandsdetails />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "categorydetails/:id",
          element: (
            <ProtectRoureProvider>
              <Categoriesdetails />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectRoureProvider>
              <Categories />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectRoureProvider>
              <Brands />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectRoureProvider>
              <Cart />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectRoureProvider>
              <WishlistPAge />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectRoureProvider>
              <Orders />
            </ProtectRoureProvider>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectRoureProvider>
          <Orders/>
            </ProtectRoureProvider>
          ),
        },
        {
          path: "regester",
          element: (
            <LoginProtected>
              <Regester />
            </LoginProtected>
          ),
        },
        {
          path: "login",
          element: (
            <LoginProtected>
              <Login />
            </LoginProtected>
          ),
        },
        { path: "forgetpassword", element: <Forgetpassword /> },
        { path: "VerifyResetCode", element: <VerifyResetCode /> },
        { path: "resetpassword", element: <Resetpassword /> },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
    
  ]);
  let client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={Routes} />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
