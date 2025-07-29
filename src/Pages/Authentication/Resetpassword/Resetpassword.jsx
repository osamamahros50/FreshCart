import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./../../../../node_modules/axios/lib/axios";
import { object, string } from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
export default function Resetpassword() {
  const navigate = useNavigate();
  let [loadingspin, setloadingspin] = useState(false);
  const passregux = /^[A-Z][a-z-0-9]{8}$/;
  const validationSchema = object({
    email: string()
      .required("email must be required")
      .email("email must be valid"),
    newPassword: string()
      .required("password must be required")
      .matches(
        passregux,
        "password must be start with an uppercase letter and be  at least 8 characters long"
      ),
  });

  async function rsetePassword(values) {
    const loadingtoast = toast.loading("loading");
    setloadingspin(true);
    try {
      console.log(values);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("password updated");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("reset code not verified");
    } finally {
      toast.dismiss(loadingtoast);
      setloadingspin(false);
    }
  }
  const Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: rsetePassword,
    validationSchema,
  });
  return (
    <div className="space-y-4 py-10 px-4 sm:px-6 dark:bg-slate-700 dark:text-slate-200">
      <h2 className="font-bold text-secondary text-2xl text-center">
        Create New Password
      </h2>
      <form
        onSubmit={Formik.handleSubmit}
        action=""
        className="w-full max-w-2xl mx-auto"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-secondary font-bold mt-5">
            email:
          </label>
          <input
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            type="email"
            className="inputStyle"
            placeholder=""
            id="email"
          />
        </div>
        {Formik.errors.email && Formik.touched.email && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 filter "
            role="alert"
          >
            <span class="font-semibold"> {Formik.errors.email}</span>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-secondary font-bold mt-5">
            New-Password:
          </label>
          <input
            value={Formik.values.newPassword}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            type="Password"
            className="inputStyle"
            placeholder=""
            id="newPassword"
          />
        </div>
        {Formik.errors.newPassword && Formik.touched.newPassword && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 "
            role="alert"
          >
            <span class="font-semibold"> {Formik.errors.newPassword}</span>
          </div>
        )}
        <div className="flex  flex-col justify-center items-center">
          <button
            disabled={loadingspin}
            type="submit"
            className="btn my-4 w-full"
          >
            {loadingspin ? (
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              " Reset my password"
            )}
          </button>
          <p>
            <Link
              to={"/login"}
              className="text-main mx-auto hover:text-secondary duration-300 underline font-bold "
            >
              Back To Log In?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
