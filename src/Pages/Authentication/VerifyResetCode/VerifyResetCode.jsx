import { useFormik } from "formik";
import axios from "./../../../../node_modules/axios/lib/axios";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react";
import { useState } from "react";
export default function VerifyResetCode() {
  let [loadingspin, setloadingspin] = useState(false);
  const navagate = useNavigate();
  const validationSchema = object({
    resetCode: string()
      .required("resetCode is required")
      .length(6, "The verify code must be exactly 6 numbers"),
  });
  async function sendVerfiyCode(values) {
    const loadingtoast = toast.loading("loading");
    setloadingspin(true);
    try {
      console.log(values);
      const Options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(Options);
      console.log(data);
      toast.success("The reset code is correct");
      setTimeout(() => {
        navagate("/resetpassword");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("The reset code is invalid or has expired");
    } finally {
      toast.dismiss(loadingtoast);
      setloadingspin(true);
    }
  }
  const Formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: sendVerfiyCode,
    validationSchema,
  });
  return (
    <div className="space-y-4 py-10 px-4 sm:px-6 dark:bg-slate-700 dark:text-slate-200">
      <h2 className="font-bold text-secondary text-2xl text-center">
        Check Your Email
      </h2>
      <form
        action=""
        onSubmit={Formik.handleSubmit}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="flex flex-col space-y-2 ">
          <label htmlFor="number" className="text-secondary font-bold mt-5">
            Enter Reset Code
          </label>
          <input
            value={Formik.values.resetCode}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            type="text"
            className="inputStyle"
            placeholder=""
            id="resetCode"
          />
        </div>
        {Formik.errors.resetCode && Formik.touched.resetCode && (
          <div
            className="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 filter "
            role="alert"
          >
            <span className="font-semibold"> {Formik.errors.resetCode}</span>
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
              "Resete Code"
            )}
          </button>
          <p>
            <Link
              to={"/forgetpassword"}
              className="text-main mx-auto hover:text-secondary duration-300 font-bold underline"
            >
              Back To Forget Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
