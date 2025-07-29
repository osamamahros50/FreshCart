import { useContext } from "react";
import { authContext } from "../Context/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function LoginProtected({ children }) {
  let { token } = useContext(authContext);
  return <div>{!token ? children : <Navigate to={"/home"} />}</div>;
}
