import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContextProvider";

export default function LoginProtected({ children }) {
  let { token } = useContext(authContext);
  return <div>{!token ? children : <Navigate to={"/home"} />}</div>;
}
