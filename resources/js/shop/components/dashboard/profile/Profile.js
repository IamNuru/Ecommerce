import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/Context";
import CartContext from "../../context/cart/Context";
import Sidebar from "../../inc/Sidebar";
import Header from "../../inc/Header";

const Profile = () => {
    const { user } = useContext(UserContext);
    const { wishList } = useContext(CartContext);

    return (
        <div className="block mt-20">
            <Header />
            <div className="md:hidden mt-28">
                <Sidebar />
            </div>
            <div className="md:border border-gray-200 md:rounded-md md:px-2 md:mx-1 block md:min-h-32 px-1 py-2 md:py-4 md:flex md:-mt-8 md:pt-8">
                <div className="md:pt-24 md:mr-1 border-r border-gray-200 font-semibold text-xl w-full md:w-48">
                    Account
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                    <Link
                        to="/account/profile"
                        className="bg-white flex md:block px-4 py-1 md:py-4 hover:shadow-2xl md:hover:border-purple-600 transition duration-500 md:rounded md:rounded-md md:shadow-lg border-t md:border border-purple-200 md:text-center"
                    >
                        <h2 className="md:font-semibold text-md w-full md:py-2">
                            Profile
                        </h2>
                        <div className="hidden md:block text-gray-800 block">
                            <div>{user && user.email}</div>
                            <div>{user && user.phone}</div>
                        </div>
                        <i className="md:hidden fa fa-angle-right ml-auto font-semibold"></i>
                    </Link>
                    <Link
                        to="/account/resetpassword"
                        className="bg-white flex md:block px-4 py-1 md:py-4 hover:shadow-2xl md:hover:border-purple-600 transition duration-500 md:rounded md:rounded-md md:shadow-lg border-t md:border border-purple-200 md:text-center"
                    >
                        <h2 className="md:font-semibold text-md w-full md:py-2">
                            Reset Password
                        </h2>
                        <div className="hidden md:block text-gray-800 block">
                            <div>Change your password</div>
                        </div>
                        <i className="md:hidden fa fa-angle-right ml-auto font-semibold"></i>
                    </Link>
                    {user && user.role === "admin" && (
                        <Link
                            to="/admin/area"
                            className="bg-white flex md:block px-4 py-1 md:py-4 hover:shadow-2xl md:hover:border-purple-600 transition duration-500 md:rounded md:rounded-md md:shadow-lg border-t md:border border-purple-200 md:text-center"
                        >
                            <h2 className="md:font-semibold text-md w-full md:py-2">
                                Admin Area
                            </h2>
                            <div className="hidden md:block text-gray-800 block">
                                <div>
                                    You can add, delete and update products and
                                    categories here
                                </div>
                            </div>
                            <i className="md:hidden fa fa-angle-right ml-auto font-semibold"></i>
                        </Link>
                    )}
                </div>
            </div>

            {/* tstore links */}
            <div className="md:border border-gray-200 md:rounded-md md:px-2 md:mx-1 block md:mt-4 md:min-h-32 px-1 py-2 md:py-4 md:flex">
                <div className="md:pt-6 md:mr-1 md:border-r md:border-gray-200 font-semibold text-xl w-full md:w-48">
                    Tstore
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                    <Link
                        to="/account/orders"
                        className="bg-white flex md:block px-4 py-1 md:py-4 hover:shadow-2xl md:hover:border-purple-600 transition duration-500 md:rounded md:rounded-md md:shadow-lg border-t md:border border-purple-200 md:text-center"
                    >
                        <h2 className="md:font-semibold text-md w-full md:py-2">
                            Orders
                        </h2>
                        <p className="hidden md:block text-gray-800 block">
                            You've made{" "}
                            <span className="text-purple-800">
                                {user && user.transactions?.length}
                            </span>{" "}
                            orders
                        </p>
                        <i className="md:hidden fa fa-angle-right ml-auto font-semibold"></i>
                    </Link>
                    <Link
                        to="/account/wishlist"
                        className="bg-white flex md:block px-4 py-1 md:py-4 hover:shadow-2xl md:hover:border-purple-600 transition duration-500 md:rounded md:rounded-md md:shadow-lg border-t md:border border-purple-200 md:text-center"
                    >
                        <h2 className="md:font-semibold text-md w-full md:py-2">
                            Wish List
                        </h2>
                        <p className="hidden md:block text-gray-800 block">
                            You have{" "}
                            <span className="text-purple-800">
                                {wishList?.length}
                            </span>{" "}
                            items in your wish list. <br />
                        </p>
                        <i className="md:hidden fa fa-angle-right ml-auto font-semibold"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
