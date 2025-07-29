import axios from "axios/unsafe/axios.js";
import { createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(localStorage.getItem("token"));
  async function verfyToken() {
    if (localStorage.getItem("token")) {
      try {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
          method: "GET",
          headers: { token: localStorage.getItem("token") },
        };
        const { data } = await axios.request(options);
        console.log(data);

        localStorage.setItem("userId", data.decoded.id);
      } catch (err) {
        console.log(err);
        // toast.error('😒 hrammmy')
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      verfyToken();
    }
  }, []);
  return (
    <authContext.Provider value={{ token, setToken, verfyToken }}>
      {children}
    </authContext.Provider>
  );
}
