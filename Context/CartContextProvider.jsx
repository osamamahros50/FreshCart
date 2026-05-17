import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export let cartcontext = createContext(null);

export default function CartContextProvider({ children }) {
  let [cart, setCart] = useState(null);
  let [loading, setLoading] = useState(false);
  let [dissapled, setDissapled] = useState(false);
  async function getLogedCart() {
    try {
      setLoading(true);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "get",
        headers: { token: localStorage.getItem("token") },
      };
      let { data } = await axios.request(options);

      console.log(data);
      setCart(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getaddToCart(productId) {
    let loading = toast.loading("Watting...");
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setCart(data);
      toast.success("The product has been added successfully");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }

  async function removeItemcart(cartItemid) {
    let loading = toast.loading("Watting...");
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemid}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setCart(data);
      toast.success("The product has been deleted successfully");
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
    }
  }
  async function clearCart() {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setCart(data);
      toast.success("All products have been deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCartItem(cartItemid, count) {
    setDissapled(true);
    let loading = toast.loading("Watting...");
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemid}`,
        { count: count },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      setCart(data);
      toast.success("Updated Card");
    } catch (error) {
      console.log(error);
    } finally {
      setDissapled(false);
      toast.dismiss(loading);
    }
  }

  useEffect(() => {
    getLogedCart();
  }, []);

  return (
    <cartcontext.Provider
      value={{
        cart,
        setCart,
        getaddToCart,
        loading,
        setLoading,
        getLogedCart,
        removeItemcart,
        clearCart,
        updateCartItem,
        dissapled,
        setDissapled,
      }}
    >
      {children}
    </cartcontext.Provider>
  );
}
