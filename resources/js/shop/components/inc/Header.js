import React, { useContext } from "react";
import CartContext from "../context/cart/CartContext";
import AuthContext from "../context/auth/Context";
import SettingsContext from "../context/settings/SettingsContext";

import { Link } from "react-router-dom";

const Header = () => {
  const { logedin } = useContext(AuthContext);
  const { isNavbarOpen, closeNavbar } = useContext(SettingsContext);
  const { cart } = useContext(CartContext);

  const toggleBar = () => {
    if (isNavbarOpen === true) {
      closeNavbar(false);
    } else {
      closeNavbar(true);
    }
  };
  return (
    <div className="bg-white pt-4 flex fixed w-full top-0 z-30 mb-2 shadow-md min-h-2 py-1">
      <div className="navs flex">
        <div
          onClick={toggleBar}
          className={`z-40 cursor-pointer ml-2 md:hidden inline-flex items-center 
          justify-center p-2 text-white bg-purple-600`}
        >
          <span className="sr-only">Open main menu</span>

          <svg
            className={`${isNavbarOpen && "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <svg
            className={`${isNavbarOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <Link to="/" className="ml-2 text-4xl px-1">
          <i className="fa fa-cart-plus text-purple-600"></i>
        </Link>
      </div>

      <div className="flex ml-auto mr-4">
        {!logedin ? (
          <div className="flex">
            <Link
              to="/register"
              className="px-2 py-1 "
              title="register"
            >
              <i className="md:hidden fa fa-user-plus"></i>
              <i className="hidden md:block">Register</i>
            </Link>
            <Link to="/login" className="px-2 py-1 flex" title="sign in">
              <i className="md:hidden fa fa-sign-in"></i>
              <i className="hidden md:block">Login</i>
            </Link>
          </div>
        ) : (
          <div className="flex">
            <Link to="/account" className="px-2 py-1 " title="profiile">
              <i className="md:hidden fa fa-user-circle"></i>
              <i className="hidden md:block">Account</i>
            </Link>
          </div>
        )}
        <Link to="/cart"  className="px-2 ml-2">
          <div className="flex text-center">
            <svg
              className="stroke-current text-purple-600 text-sm inline-block w-8 h-8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="2"></circle>
              <circle cx="20" cy="21" r="2"></circle>
              <path d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"></path>
            </svg>

            <div
              className="absolute border border-purple-600 -mt-4 ml-4 bg-red-400 p-1 text-xs"
              style={{ borderRadius: "50%" }}
            >
              {cart === null ? 0 : cart.length}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
