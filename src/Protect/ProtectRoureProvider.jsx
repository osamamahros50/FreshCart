import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContextProvider";

export default function ProtectRoureProvider({ children }) {
  let { token } = useContext(authContext);
  return <div>{token ? children : <Navigate to={"/login"} />}</div>;
}
