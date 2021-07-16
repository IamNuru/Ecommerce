import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../Search";
import AuthContext from "../context/auth/Context";
import SettingsContext from "../context/settings/SettingsContext";

const Sidebar = (props) => {
  const { logedin, logout } = useContext(AuthContext);
  const { isNavbarOpen, closeNavbar } = useContext(SettingsContext);
  const { pathname } = useLocation();

  const onMobileNavClick = () => {
    window.addEventListener("click", function(e) {
      if (document.getElementById("mobile-navs").contains(e.target)) {
        closeNavbar(false);
      } else if (document.getElementById("mobile-nav").contains(e.target)) {
        closeNavbar(true);
      } else if (document.getElementById("cover").contains(e.target)) {
        closeNavbar(false);
      }
    });
  };
  return (
    <Fragment>
      <div className="md:pb-8 md:pt-6 transition-all duration-1000 -mt-14 md:mt-12 bg-white md:shadow-2xl px-2 py-2 z-20 w-full text-center md:w-48 md:h-screen fixed">
        <nav className="hidden md:block">
          <ul className="border-b pb-6 block whitespace-nowrap overflow-auto justify-center text-left">
            <li
              className={`${pathname === "/allproducts" &&
                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
            >
              <Link to="/allproducts" className="px-2 inline-block w-full">
                All
              </Link>
            </li>
            <li
              className={`${pathname === "/" &&
                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
            >
              <Link to="/" className="px-2 inline-block w-full">
                Home
              </Link>
            </li>
            <li
              className={`${pathname === "/category/shoes" &&
                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
            >
              <Link to="/category/shoes" className="px-2 inline-block w-full">
                Shoes
              </Link>
            </li>
            <li
              className={`${pathname === "/category/clothings" &&
                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
            >
              <Link
                to="/category/clothings"
                className="px-2 inline-block w-full"
              >
                Clothings
              </Link>
            </li>
            <li
              className={`${pathname === "/category/electronics" &&
                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
            >
              <Link
                to="/category/electronics"
                className="px-2 inline-block w-full"
              >
                Electronics
              </Link>
            </li>
          </ul>
        </nav>
        <Search />
        <nav className="mt-8 hidden md:block">
          <ul className="flex whitespace-nowrap overflow-auto px-8 md:px-2 md:block justify-center md:text-left">
            {!logedin ? (
              <div>
                <li className="hover:text-pink-600 hover:rounded-md rounded transition duration-400 px-4 py-2 md:px-0 md:py-0">
                  <Link to="/register" className="px-2 inline-block w-full">
                    Register
                  </Link>
                </li>
                <li className="hover:text-pink-600 hover:rounded-md rounded transition duration-400 px-4 py-2 md:px-0 md:py-0">
                  <Link to="/login" className="px-2 inline-block w-full">
                    Login
                  </Link>
                </li>
              </div>
            ) : (
              <li className="px-4 py-2 md:px-0 md:py-0">
                <button onClick={() => logout()} className="outline-none">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mobile view navs */}
      {/* <div onClick={onMobileNavClick} id="mobile-nav" className={`${!isNavbarOpen ? 'invisible opacity-0' : 'visible opacity-full'} md:hidden transition-all duration-1000 -mt-14 bg-gray-200 px-2 py-1 z-20 w-72 h-screen fixed`}> */}
      <div
        onClick={onMobileNavClick}
        id="cover"
        className={`${
          !isNavbarOpen ? "w-0" : "w-full"
        } md:hidden fixed transition-all duration-300 z-20 -mt-14 h-screen bg-black bg-opacity-25`}
      >
        <div
          id="mobile-nav"
          className={`${
            !isNavbarOpen ? "-ml-60" : "w-60"
          } transition-all duration-700 md:hidden bg-white px-1 z-40 h-screen`}
        >
          <nav id="mobile-navs" className="block z-40">
            <ul className="block whitespace-nowrap overflow-auto px-1">
              <li className="hover:bg-purple-400 transition duration-400 py-2">
                <Link to="/" className="px-2 inline-block w-full">
                  Home
                </Link>
              </li>
              <li className="hover:bg-purple-400 transition duration-400 py-2">
                <Link to="/category/shoes" className="px-2 inline-block w-full">
                  Shoes
                </Link>
              </li>
              <li className="hover:bg-purple-400 transition duration-400 py-2">
                <Link
                  to="/category/clothings"
                  className="px-2 inline-block w-full"
                >
                  Clothings
                </Link>
              </li>
              <li className="hover:bg-purple-400 transition duration-400 py-2">
                <Link
                  to="/category/electronics"
                  className="px-2 inline-block w-full"
                >
                  Electronics
                </Link>
              </li>
            </ul>
            <ul>
              <li className="mt-8">
                <Link to="/help" className="">
                  <i className="fa fa-question-circle px-1">Help</i>
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="mt-8 block">
            <ul className="flex whitespace-nowrap overflow-auto px-8">
              {!logedin ? (
                <div>
                  <li className="hover:bg-purple-400 hover:rounded-md rounded transition duration-400 py-2">
                    <Link to="/register" className="px-2 inline-block w-full">
                      Register
                    </Link>
                  </li>
                  <li className="hover:bg-purple-400 hover:rounded-md rounded transition duration-400 py-2">
                    <Link to="/login" className="px-2 inline-block w-full">
                      Login
                    </Link>
                  </li>
                </div>
              ) : (
                <li className="duration-400 px-4 py-2 md:px-0 md:py-0">
                  <button onClick={() => logout()} className="outline-none">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
