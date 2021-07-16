import React from "react";
import { Link } from "react-router-dom";
import AmountToPay from "./AmountToPay";
import Pay from "./paymentMethods/PaystackPayment";

const Checkout = (props) => {
  return (
    <div className="bg-white block w-full md:w-96 h-screen px-4 py-4 m-auto shadow-2xl rounded-md bg-white">
      <h2 className="font-semibold mt-4 text-xl text-gray-700 text-center">
        Confirm Order and Pay
      </h2>
      <div className="text-center">
        <AmountToPay />
      </div>
      <div className="block w-full text-center py-6">
        <Pay />
      </div>
      <div className="mt-8 text-center mb-4 text-sm text-gray-600">
        You can{" "}
        <Link to="/cart" className="px-1 text-purple-700">
          edit
        </Link>{" "}
        or{" "}
        <Link to="/" className="px-1 text-purple-700">
          continue
        </Link>{" "}
        shopping
      </div>
    </div>
  );
};

export default Checkout;
