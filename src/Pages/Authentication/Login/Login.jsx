/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import axios from "./../../../../node_modules/axios/lib/axios";
import { object, string } from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { authContext } from "../../../../Context/AuthContextProvider";

export default function Login() {
  let [loadingspin, setloadingspin] = useState(false);
  let [showpass, setshowpass] = useState("password");
  function toggleShowPass() {
    setshowpass(showpass === "password" ? "text" : "password");
  }
  let { setToken, verfyToken } = useContext(authContext);
  const navigate = useNavigate();
  const passregux = /^[A-Z][a-z-0-9]{8}$/;
  const validationSchema = object({
    email: string()
      .required("email must be required")
      .email("email must be valid"),
    password: string()
      .required("password must be required")
      .matches(
        passregux,
        "password must be start with an uppercase letter and be  at least 8 characters long"
      ),
  });

  async function sendDataToLogin(values) {
    const loadingtoast = toast.loading("loading");
    setloadingspin(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "Post",
        data: values,
      };
      const { data } = await axios.request(options);
      // console.log(data.token);
      localStorage.setItem("token", data.token);
      verfyToken();
      toast.success(data.message);
      setTimeout(() => {
        setToken(data.token);
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingtoast);
      setloadingspin(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  });
  return (
    <div className="space-y-4 py-10 px-4 sm:px-6 dark:bg-slate-700 dark:text-slate-200">
      <h2 className="font-bold text-secondary text-2xl text-center">
        <i className="fa-solid fa-user mr-2 text-4xl"></i>Login Now
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl mx-auto"
        action=""
      >
        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-secondary font-bold mt-5">
            Email:
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            className="inputStyle"
            placeholder=""
            id="email"
          />
        </div>

        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 my-2 text-md text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-semibold">{formik.errors.email}</span>
          </div>
        )}

        {/* Password */}
        <div className="flex flex-col space-y-2 relative">
          <label htmlFor="password" className="text-secondary font-bold mt-5">
            Password:
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={showpass}
            className="inputStyle"
            placeholder=""
            id="password"
          />
          <div
            className="absolute right-3 top-[55%] transform -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPass}
          >
            {showpass === "password" ? (
              <EyeOff className="text-main" />
            ) : (
              <Eye className="text-main" />
            )}
          </div>
        </div>

        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 my-2 text-md text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-semibold">{formik.errors.password}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center flex-col">
          <button
            disabled={loadingspin}
            type="submit"
            className="btn my-4 w-full bg-main hover:bg-secondary duration-300"
          >
            {loadingspin ? (
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "Login"
            )}
          </button>

          <p>
            <Link
              to={"/forgetpassword"}
              className="text-main hover:text-secondary duration-300 font-bold underline"
            >
              Forgot your password?
            </Link>
          </p>

          <p className="pt-5">
            <Link
              to={"/regester"}
              className="font-bold bg-main hover:bg-secondary duration-300 p-3 rounded-2xl text-slate-200"
            >
              Create A New Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
