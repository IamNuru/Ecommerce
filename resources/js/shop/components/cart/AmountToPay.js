import React, { useContext } from "react";
import CartContext from "../context/cart/CartContext";
import { Link } from "react-router-dom";
import Formatter from "../inc/Formatter";

const AmountToPay = () => {
  const { cart, couponValue, shippingCharge } = useContext(CartContext);

  return cart?.length > 0 ? (
    <p className="italic text-sm">
      {" "}
      You are about to make payment of{" "}
      <span className="font-semibold">
        {Formatter.format(
          cart
            .map((item) => (item.price-item.deduction) * item.qty)
            .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) -
            cart
              .map((item) => (item.price-item.deduction) * item.qty)
              .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) *
              (couponValue / 100) +
            shippingCharge
        )}
      </span>
    </p>
  ) : (
    <p className="text-base">
      Your{" "}
      <Link to="/cart" className="px-1 text-purple-700">
        cart
      </Link>{" "}
      is Empty. Start <Link to="/">Shopping</Link> now
    </p>
  );
};

export default AmountToPay;
