import Amazon from "../../assets/images/amazon-pay.png";
import Amercan from "../../assets/images/American-Express-Color.png";
import Masterd from "../../assets/images/mastercard.webp";
import Paypal from "../../assets/images/paypal.png";
import AppleLogo from "../../assets/images/get-apple-store.png";
import GoogleLogo from "../../assets/images/get-google-play.png";
export default function Footer() {
  return (
    <div className="bg-slate-200 text-secondary py-10 dark:bg-slate-800 ">
      <div className="container space-y-4 px-4 sm:px-6 lg:px-8 mx-auto">
        <h3 className="text-secondary text-2xl font-medium text-center sm:text-left">
          Get the Freshcart
        </h3>
        <p className="text-secondary text-center sm:text-left font-semibold">
          We will send you a link, open it on your phone to download the app
        </p>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <input
            className="w-full sm:grow focus:outline-none border border-slate-500 focus:border-secondary rounded-md p-2  bg-slate-50"
            type="text"
            name="email"
            placeholder="Email..."
            id="useremail"
          />
          <button className="btn w-full px-5 font-bold hover:bg-main duration-300 sm:w-auto">
            Send{" "}
          </button>
        </div>

        {/* Logos Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-slate-300 py-7">
          {/* Payment Partners */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            <h3 className="text-xl w-full md:w-auto text-center md:text-left">
              Payment Partners
            </h3>
            <img className="w-20 object-contain" src={Amazon} alt="Amazon" />
            <img
              className="w-20 object-contain"
              src={Amercan}
              alt="American Express"
            />
            <img
              className="w-16 object-contain"
              src={Masterd}
              alt="Mastercard"
            />
            <img className="w-20 object-contain" src={Paypal} alt="Paypal" />
          </div>

          {/* App Stores */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <h3 className="text-md font-semibold text-secondary w-full md:w-auto text-center md:text-left">
              Get deliveries with Freshcart
            </h3>
            <img
              className="w-20 object-contain"
              src={AppleLogo}
              alt="Apple Store"
            />
            <img
              className="w-20 object-contain"
              src={GoogleLogo}
              alt="Google Play"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
