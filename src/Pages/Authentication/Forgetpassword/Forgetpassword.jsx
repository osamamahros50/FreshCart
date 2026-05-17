import React from "react";
import { Formik, useFormik } from "formik";
import axios from "./../../../../node_modules/axios/lib/axios";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgetpassword() {
  const navigate = useNavigate();
  const validationSchema = object({
    email: string()
      .required("email must be required")
      .email("email must be valid"),
  });
  async function resetMyPassword(values) {
    const loadingtoast = toast.loading("loading");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Reset code sent to your email");
      setTimeout(() => {
        navigate("/verifyResetCode");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingtoast);
    }
  }
  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: resetMyPassword,
    validationSchema,
  });
  return (
    <div className="space-y-4 py-10 px-4 sm:px-6 dark:bg-slate-700 dark:text-slate-200">
      <h2 className="font-bold text-secondary text-2xl text-center">
        Forgot Your Password?
      </h2>
      <form
        action=""
        className="w-full max-w-2xl mx-auto"
        onSubmit={Formik.handleSubmit}
      >
        <div className="flex flex-col space-y-2 ">
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
            className="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 filter "
            role="alert"
          >
            <span className="font-semibold"> {Formik.errors.email}</span>
          </div>
        )}

        <div className="flex  flex-col justify-center items-center">
          <button type="submit" className="btn w-full my-4">
            Reset my password
          </button>
          <p>
            <Link
              to={"/login"}
              className="text-main mx-auto hover:text-secondary duration-300 font-bold underline"
            >
              Already have an account?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
