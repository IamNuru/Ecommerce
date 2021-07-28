import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/Context";
import CartContext from "../../context/cart/Context";

import Formatter from "../../inc/Formatter";

const SuccessOrder = props => {
    const {refreshUser, user } = useContext(UserContext);
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        if (props) {
            clearCart();
            refreshUser()
        }
        // eslint-disable-next-line
    }, [props, user]);
    

    return (
        <div className="bg-white block w-full md:w-96 h-screen px-4 py-4 m-auto shadow-2xl rounded-md bg-white text-blue-500">
            
            <h2 className="text-center font-bold text-6xl w-full py-8">
                <i className="fa fa-handshake-o"></i>
            </h2>


            <div className="mt-2 mb-4">
                <p>Hi {user ? user.first_name ? user.first_name : user.email : ''}, Thank you for making an order with us.</p> 
                <p className="p-2">
                    A total amount of{" "}
                    <span className="text-pink-600">
                        {props && Formatter.format(props.match.params.amount / 100)}
                    </span>{" "}
                    was deducted from your{" "}
                    <span className="text-pink-600">
                        {props && props.match.params.channel}
                    </span>{" "}
                    wallet
                </p>
            </div>


            <p className="my-4">
                Your Order Number is{" "}
                <span className="text-pink-600">
                    {props && props.match.params.ref}
                </span>
            </p>


            <p className="my-4">
                Please Copy your order number for references should you need
                inquiry about your order. You can also use the order number to
                track your product
            </p>


            <p className="my-4">
                Continue{" "}
                <Link to="/" className="text-green-600">
                    Shopping <i className="fa fa-arrow-right"></i>
                </Link>
            </p>


            <p className="my-2">
                Please click{" "}
                <Link to="/account/orders" className="text-green-600">
                    orders
                </Link>{" "}
                to view your orders.
            </p>


        </div>
    );
};

export default SuccessOrder;
