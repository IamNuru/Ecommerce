import React from "react";
import EmptyCartImg from "../../images/empty_cart.svg";
import { Link } from "react-router-dom"

const EmptyCart = () => {
  return (
    <div className="block">
    <p className="text-red-800 text-md text-center">
      Whoops!!! It looks like your cart is currently Empty.
    </p>
      <img
        src={EmptyCartImg}
        alt="Empty Cart"
        className="md:w-48 w-full px-4 mt-16 m-auto"
      />
      <div className="text-center">
        <div className="mt-8 mb-2">
          <i className="fa fa-cart text-gray-400 text-7xl"></i>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Don't worry, we got you covered. Click on{" "}
          <Link
            to="/"
            className="underline text-green-600 px-1 hover:text-purple-600"
          >
            Start Shopping
          </Link>
          to explore our goodies
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;
