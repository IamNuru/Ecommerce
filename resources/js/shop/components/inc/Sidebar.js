import React, { Fragment, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import AuthContext from "../context/auth/Context";
import SettingsContext from "../context/settings/Context";
import CartContext from "../context/cart/Context";
import CategoryContext from "../context/category/Context";

const Sidebar = props => {
    const { logedin, logout } = useContext(AuthContext);
    const { wishList } = useContext(CartContext);
    const { getCategories, categories } = useContext(CategoryContext);
    const { isNavbarOpen, closeNavbar } = useContext(SettingsContext);
    const { pathname } = useLocation();
    const page = pathname.split('/').pop();

    useEffect(() => {
        getCategories();
    }, []);

    const onMobileNavClick = () => {
        window.addEventListener("click", function(e) {
            if (document.getElementById("mobile-navs").contains(e.target)) {
                closeNavbar(false);
            } else if (
                document.getElementById("mobile-nav").contains(e.target)
            ) {
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
                            className={`${page === "allproducts" &&
                                "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
                        >
                            <Link
                                to="/allproducts"
                                className="px-2 inline-block w-full"
                            >
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
                        {categories !== null
                            ? categories.length > 0
                                ? categories.map((cat, index) => {
                                      return (
                                          <li
                                              key={cat.id}
                                              className={`${page === cat.slug} &&
                      "text-red-600 ml-2"} text-gray-600 hover:text-black mb-1 transition duration-400 px-4 py-2 md:px-0 md:py-0`}
                                          >
                                              <Link
                                                  to={`/category/${cat.slug}`}
                                                  className="px-2 flex flex-wrap w-full"
                                              >
                                                  <span>{cat.name}</span>
                                                  <span className="overflow-hidden h-4 max-w-12 px-1 text-center text-xs bg-green-200 text-green-800 rounded-full">
                                                      {cat.products
                                                          ? cat.products.length
                                                          : 0}
                                                  </span>
                                              </Link>
                                          </li>
                                      );
                                  })
                                : ""
                            : ""}
                    </ul>
                </nav>
                <Search />
                <nav className="mt-8 hidden md:block">
                    <ul className="flex whitespace-nowrap overflow-auto px-8 md:px-2 md:block justify-center md:text-left">
                        <li className="mb-4 hover:text-pink-600 hover:rounded-md rounded transition duration-400 px-4 py-2 md:px-0 md:py-0">
                            <Link
                                to="/wishlist"
                                className="text-md px-2 flex w-full"
                            >
                                <span>Wishlist</span>
                                <span className="overflow-hidden h-4 w-4 px-1 text-center text-xs bg-green-200 text-green-800 rounded-full">
                                    {wishList && wishList.length}
                                </span>
                            </Link>
                        </li>
                        {!logedin ? (
                            <div>
                                <li className="hover:text-pink-600 hover:rounded-md rounded transition duration-400 px-4 py-2 md:px-0 md:py-0">
                                    <Link
                                        to="/register"
                                        className="px-2 inline-block w-full"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="hover:text-pink-600 hover:rounded-md rounded transition duration-400 px-4 py-2 md:px-0 md:py-0">
                                    <Link
                                        to="/login"
                                        className="px-2 inline-block w-full"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <li className="px-4 py-2 md:px-0 md:py-0">
                                <button
                                    onClick={() => logout()}
                                    className="outline-none"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Mobile view navs */}
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
                    <nav id="mobile-navs" className="mt-2 block z-40">
                        <li className="md:hidden list-none text-md font-medium serif text-center overflow-hidden">
                            <Link to="/" className="px-2 flex w-full">
                                <span>Nuru</span>
                                <span className="text-xs px-2 text-gray-600">
                                    Boutique
                                </span>
                            </Link>
                        </li>
                        <ul className="block whitespace-nowrap overflow-auto px-1">
                            <li className="hover:bg-purple-400 transition duration-400 py-2">
                                <Link
                                    to="/allproducts"
                                    className="px-2 inline-block w-full"
                                >
                                    All
                                </Link>
                            </li>
                            <li className="hover:bg-purple-400 transition duration-400 py-2">
                                <Link
                                    to="/"
                                    className="px-2 inline-block w-full"
                                >
                                    Home
                                </Link>
                            </li>
                            {categories !== null
                                ? categories.length > 0
                                    ? categories.map((cat, index) => {
                                          return (
                                              <li
                                                  key={cat.id}
                                                  index={index}
                                                  className="hover:bg-purple-400 transition duration-400 py-2"
                                              >
                                                  <Link
                                                      to={`/category/${cat.slug}`}
                                                      className="px-2 flex flex-wrap w-full"
                                                  >
                                                      <span>{cat.name}</span>
                                                      <span className="overflow-hidden h-4 max-w-12 px-1 text-center text-xs bg-green-200 text-green-800 rounded-full">
                                                          {cat.products
                                                              ? cat.products
                                                                    .length
                                                              : 0}
                                                      </span>
                                                  </Link>
                                              </li>
                                          );
                                      })
                                    : ""
                                : ""}
                            
                        </ul>
                        <ul>
                            <li className="mt-8">
                                <Link to="/help" className="">
                                    <i className="fa fa-question-circle px-1">
                                        Help
                                    </i>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="mt-8 block">
                        <ul className="block whitespace-nowrap overflow-auto px-8">
                            <li className="mb-2 hover:bg-purple-400 hover:rounded-md rounded transition duration-400 py-2">
                                <Link
                                    to="/wishlist"
                                    className="px-2 flex w-full"
                                >
                                    <span>Wishlist</span>
                                    <span className="overflow-hidden h-4 w-4 px-1 text-center text-xs bg-green-200 text-green-800 rounded-full">
                                        {wishList && wishList.length}
                                    </span>
                                </Link>
                            </li>
                            {!logedin ? (
                                <div>
                                    <li className="hover:bg-purple-400 hover:rounded-md rounded transition duration-400 py-2">
                                        <Link
                                            to="/register"
                                            className="px-2 inline-block w-full"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li className="hover:bg-purple-400 hover:rounded-md rounded transition duration-400 py-2">
                                        <Link
                                            to="/login"
                                            className="px-2 inline-block w-full"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </div>
                            ) : (
                                <li className="duration-400 px-4 py-2 md:px-0 md:py-0">
                                    <button
                                        onClick={() => logout()}
                                        className="outline-none"
                                    >
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
