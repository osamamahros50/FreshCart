import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { cartcontext } from "../../../Context/CartContextProvider";

export default function Checkout({ totalPrice }) {
  let { cart, getLogedCart } = useContext(cartcontext);
  let [pay, setPay] = useState("cash");
  let [loadingspin, setloadingspin] = useState(false);
  let [loadingspin1, setloadingspin1] = useState(false);

  let Navigate = useNavigate();
async function checkoutOnline(values) {
  setloadingspin1(true);
  try {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=https://fresh-cart-gilt-eta.vercel.app/orders`,
      { shippingAddress: values },
      { headers: { token: localStorage.getItem("token") } }
    );
    console.log(data);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  } catch (error) {
    console.log(error);
  } finally {
    setloadingspin1(false);
  }
}

  async function checkoutcash(values) {
    setloadingspin(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(data);
      if (data.status == "success") {
        Navigate("/orders");
        getLogedCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloadingspin(false);
    }
  }
  const phone = /^01[0125][0-9]{8}$/;
  const validationSchema = object({
    details: string().required("input must be required"),
    phone: string()
      .required("phone must be required")
      .matches(phone, "phone must be following egyption number"),
    city: string().required("must be required"),
  });
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (x) => {
      console.log(x);
      if (pay === "cash") {
        checkoutcash(x);
      } else {
        checkoutOnline(x);
      }
    },
    validationSchema,
  });
  return (
    <>
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div>
          <p className="mb-1 text-lg font-bold">
            ${totalPrice?.data?.totalCartPrice} USD
          </p>
        </div>
      </div>
      <h3 className="text-center text-green-400 text-2xl font-bold">
        Check Out
      </h3>
      <div className="mb-5">
        <div className="bg-green-400 h-0.5  w-1/3 m-auto"></div>
        <div className="bg-green-400 h-0.5 my-2  w-1/4 m-auto"></div>
        <div className="bg-green-400 h-0.5  w-1/3 m-auto"></div>
      </div>
      <form onSubmit={formik.handleSubmit} action="" className="w-full">
        <div className="flex flex-col space-y-2 relative">
          <label htmlFor="phone">phone:</label>
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="inputStyle "
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
        <div className="flex flex-col space-y-2 relative">
          <label htmlFor="city">city:</label>
          <input
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="inputStyle"
            placeholder=""
            id="city"
          />
        </div>

        {formik.errors.city && formik.touched.city && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.city}</span>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <label htmlFor="details">details:</label>
          <textarea
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="inputStyle"
            placeholder=""
            id="details"
          />
        </div>
        {formik.errors.details && formik.touched.details && (
          <div
            class="p-4 my-2 text-md  text-red-800 rounded-lg bg-red-100 filter "
            role="alert"
          >
            <span class="font-semibold"> {formik.errors.details}</span>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setPay("cash");
            }}
            type="submit "
            className="mt-6 rounded-md btn w-1/2 bg-secondary  font-medium text-blue-50 hover:bg-main"
          >
            {loadingspin ? (
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "  Check cash"
            )}
          </button>
          <button
            onClick={() => {
              setPay("online");
            }}
            type="submit"
            className="mt-6 rounded-md btn w-1/2 bg-white text-secondary border  font-medium hover:text-white  hover:bg-secondary"
          >
            {loadingspin1 ? (
              <Loader className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              " Check online"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
