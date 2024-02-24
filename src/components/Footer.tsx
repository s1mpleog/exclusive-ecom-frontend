import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Input } from "./ui/input";
import DownloadImage from "@/assets/images/download.png";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-10 flex flex-col items-start justify-start space-y-10 sm:space-y-0  sm:grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <div className="container mx-auto">
        <div className="flex space-y-5 flex-col">
          <Logo />
          <p className="text-xl font-medium">Subscribe</p>
          <p>Get 10% off your first order</p>
          <Input
            className="bg-transparent py-4 w-40"
            placeholder="Enter your email"
          />
        </div>

        {/* section-2 */}
      </div>
      <div className="flex space-y-5 flex-col">
        <h3 className="text-2xl font-semibold">Support</h3>
        <p className="text-base font-medium">
          Kokhomskoe SHosse, bld. 9, <br /> appt. 227, Russia.
        </p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      {/* section-3 */}
      <div className="flex space-y-5 flex-col">
        <h3 className="text-2xl font-semibold">Account</h3>
        <Link to="/my-account" className="text-base font-medium">
          My Account
        </Link>
        <Link to="/register">Login / Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/products">Shop</Link>
      </div>

      {/* section-4 */}
      <div className="flex space-y-5 flex-col">
        <h3 className="text-2xl font-semibold">Quick Link</h3>
        <Link to="/privacy-policy" className="text-base font-medium">
          Privacy Policy
        </Link>
        <Link to="/terms-and-use">Terms Of Use</Link>
        <Link to="/faqs">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* section-5 */}
      <div className="flex flex-col space-y-6">
        <h3 className="text-2xl font-semibold">Download App</h3>
        <p className="text-base font-medium">Save $3 with App New User Only </p>
        <img
          src={DownloadImage}
          className="object-cover w-40 cursor-pointer"
          alt="download"
        />
        <div className="flex text-2xl cursor-pointer space-x-5">
          <FaFacebook />
          <BsTwitter />
          <BsInstagram />
          <BsLinkedin />
        </div>
      </div>
    </footer>
  );
}
