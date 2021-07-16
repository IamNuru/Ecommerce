import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/Context";
import CartContext from "../context/cart/CartContext";

const CartCheckOutButton = () => {
  const { logedin } = useContext(AuthContext);
  const { errors } = useContext(CartContext);

  return (
    <Fragment>
      {logedin ? errors === null ? (
        <button
          disabled={true}
          className={`${errors !== null &&
            "disabled"} flex justify-center w-full py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none`}
        >
          <Link to="/cart/checkout" className="w-full px-10 flex">
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="credit-card"
            className="w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
            />
          </svg>
            Procceed to checkout
          </Link>
        </button>
      ) : <i className="text-red-600 text-sm mt-2">Something went wrong in your cart</i>

      : (
        <p className="text-center">
          Please{" "}
          <Link to="/login" className="text-purple-800 px-1">
            login
          </Link>{" "}
          and Proceed to Checkout
        </p>
      )}
    </Fragment>
  );
};

export default CartCheckOutButton;
