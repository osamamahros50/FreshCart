import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuthContextProvider";
import { useContext } from "react";

export default function ProtectRoureProvider({ children }) {
  let { token } = useContext(authContext);
  return <div>{token ? children : <Navigate to={"/login"} />}</div>;
}
