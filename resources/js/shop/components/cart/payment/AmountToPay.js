import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Formatter from "../../inc/Formatter";
import CartContext from "../../context/cart/Context";
import UserContext from "../../context/user/Context";
import DestinationContext from "../../context/destination/Context";

const AmountToPay = props => {
    const {
        cart,
        refreshCart,
        getCartTotalAmount,
        getCartCouponWorth,
        cartTotal,
        couponWorth,
    } = useContext(CartContext);
    const { user, refreshUser } = useContext(UserContext);
    const {
        
        shippingCharge,
        setShippingCharge,
        getDestination,
        destination
    } = useContext(DestinationContext);
    //const { cartTotal, couponWorth, shippingCharge } = props;
    const [t, sett] = useState(0)
    const [w, setw] = useState(0)
    const [s, sets] = useState(0)

    useEffect(() => {
        if (user) {
            user.destination_id !== null
                ? getDestination(parseInt(user.destination_id))
                : setShippingCharge(0);
        } else {
            setShippingCharge(0);
        }
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        refreshUser()
        refreshCart(cart);
        getCartTotalAmount();
        getCartCouponWorth();
        // eslint-disable-next-line
    }, [cart]);

    useEffect(() => {
      if (destination) {
        //sett(parseInt(destination.amount))
        setw(couponWorth ? parseInt(couponWorth) : 0)
        sets(shippingCharge ? parseInt(shippingCharge) : 0)
        sett(cartTotal ? parseInt(cartTotal) : 0)
      }
    }, [destination, couponWorth, shippingCharge, cartTotal ])

    return cart?.length > 0 ? (
        <p className="italic text-sm">
            You are about to make payment of{" "}
            <span className="font-semibold">
                {Formatter.format(
                    parseInt(t) -
                        parseInt(w) +
                        parseInt(s)
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
