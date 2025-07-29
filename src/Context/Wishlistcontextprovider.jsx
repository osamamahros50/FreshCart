import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export let WishlistContext = createContext(null);

export default function  WishlistContextProvider({ children }) {
  let [wishlist, setWishlist] = useState(null);
  let [wishlistlike, setWishlistLike] = useState([]);
  let [loading, setLoading] = useState(false);
  let [dissapled, setDissapled] = useState(false);
  async function getLogedWishlist() {
    try {
      setLoading(true);

      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "get",
        headers: { token: localStorage.getItem("token") },
      };
      let { data } = await axios.request(options);

      console.log(data);
      setWishlist(data);
      setWishlistLike(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getaddToWishlist(productId) {
    let loading = toast.loading("Watting...");

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);

      getLogedWishlist();
      toast.success("The product has been added successfully To your Wishlist");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }

  async function removeItemWishlist(productId) {
    let loading = toast.loading("Waiting...");
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);

      setWishlist((prev) => ({
        ...prev,
        data: prev.data.filter((item) => item._id !== productId),
      }));

      setWishlistLike((prev) => prev.filter((item) => item._id !== productId));
      toast.success("The product has been deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }

  async function updateWishlistItem(WishlistId, count) {
    setDissapled(true);
    let loading = toast.loading("Watting...");
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${WishlistId}`,
        { count: count },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setWishlist(data);
      toast.success("Updated Card");
    } catch (error) {
      console.log(error);
    } finally {
      setDissapled(false);
      toast.dismiss(loading);
    }
  }

  useEffect(() => {
    getLogedWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        getaddToWishlist,
        loading,
        setLoading,
        getLogedWishlist,
        removeItemWishlist,
        updateWishlistItem,
        dissapled,
        setDissapled,
        wishlistlike,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
