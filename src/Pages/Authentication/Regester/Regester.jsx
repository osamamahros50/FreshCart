import { Formik, useFormik } from "formik";
import { object, ref, string } from "yup";
import axios from "./../../../../node_modules/axios/lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
export default function Regester() {
  let [showpass, setShowpass] = useState("password");
  let [showrepass, setShowrepass] = useState("password");
  let [loadingspin, setloadingspin] = useState(false);
  function toggleShowPass() {
    setShowpass(showpass === "password" ? "text" : "password");
  }
  function toggleShowrePass() {
    setShowrepass(showrepass === "password" ? "text" : "password");
  }
  const passregux = /^[A-Z][a-z-0-9]{8}$/;
  const phone = /^01[0125][0-9]{8}$/;
  const navigate = useNavigate();
  const validationSchema = object({
    name: string("name must be string")
      .required("name must be required")
      .min(5, "Name must be at least 5 characters")
      .max(20, "name must max 20 char"),
    email: string()
      .required("email must be required")
      .email("email must be valid"),
    password: string()
      .required("password must be required")
      .matches(
        passregux,
        "password must be start with an uppercase letter and be  at least 8 characters long"
      ),
    rePassword: string()
      .required("Please confirm your password")
      .matches(passregux)
      .oneOf([ref("password")], "password must matching"),
    phone: string()
      .required("phone must be required")
      .matches(phone, "phone must be following egyption number"),
  });
  async function sendDAtaToRegester(values) {
    const loadingToast = toast.loading("loading....");
    setloadingspin(true);
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      // console.log(data);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // console.log(error);

      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setloadingspin(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDAtaToRegester,
    validationSchema: validationSchema,
  });
  return (
    <div className="space-y-4 py-10 px-4 sm:px-6 dark:bg-slate-700 dark:text-slate-200 ">
      <h2 className="font-bold text-secondary text-2xl text-center">
        <i className="fa-solid fa-user mr-2 text-4xl"></i>Register Now
      </h2>
      <form
        action=""
        className="w-full max-w-2xl mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="relative flex flex-col space-y-3 mb-3">
          <label htmlFor="userName" className="text-secondary font-bold mt-5">
            Name:
          </label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" inputStyle"
            type="text"
            name="name"
            placeholder=""
            id="userName"
          />
        </div>
        {formik.errors.name && formik.touched.name && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 filter "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.name}</span>
          </div>
        )}
        <div className=" relative flex flex-col space-y-3 mb-3">
          <label htmlFor="email" className="text-secondary font-bold mt-5">
            Email:
          </label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" inputStyle "
            type="email"
            name="email"
            placeholder=""
            id="email"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            class="p-4 my-2 text-md text-red-800 rounded-lg bg-red-100 "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.email}</span>
          </div>
        )}
        <div className="flex flex-col space-y-3 mb-3 relative">
          <label htmlFor="password" className="text-secondary font-bold mt-5">
            password:
          </label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" inputStyle"
            type={showpass}
            name="password"
            placeholder=""
            id="password"
          />
          <div
            className="absolute right-2 top-[50%] cursor-pointer"
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
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.password}</span>
          </div>
        )}
        <div className="flex flex-col space-y-3 mb-3 relative">
          <label htmlFor="repassword" className="text-secondary font-bold mt-5">
            rePassword:
          </label>
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" inputStyle"
            type={showrepass}
            name="rePassword"
            placeholder=""
            id="repassword"
          />
          <div
            className="absolute right-2 top-[50%] cursor-pointer"
            onClick={toggleShowrePass}
          >
            {showrepass === "password" ? (
              <EyeOff className="text-main" />
            ) : (
              <Eye className="text-main" />
            )}
          </div>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 "
            role="alert "
          >
            <span class="font-semibold"> {formik.errors.rePassword}</span>
          </div>
        )}
        <div className="flex flex-col space-y-3 mb-3 ">
          <label htmlFor="phone" className="text-secondary font-bold mt-5">
            phone:
          </label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" inputStyle"
            type="text"
            name="phone"
            placeholder=""
            id="phone"
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.phone}</span>
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          <button
            disabled={loadingspin}
            type="submit"
            className="btn my-4 w-full"
          >
            {loadingspin ? (
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "Regester"
            )}
          </button>
          <p>
            <Link
              to={"/login"}
              className="text-main mx-auto hover:text-secondary duration-300 font-bold hover:underline"
            >
              Already have an account?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
