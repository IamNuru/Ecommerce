import React, { useContext, useEffect } from "react";
import ApplyCoupon from "./ApplyCoupon";
import CartCheckOutButton from "./CartCheckOutButton";
import CartRow from "./CartRow";
import CartContext from "../context/cart/CartContext";
import Formatter from "../inc/Formatter";
import EmptyCart from "./EmptyCart";
import ShippingCharge from "./ShippingCharge";
import AuthContext from "../context/auth/Context";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const {
        cart,
        errors,
        clearErrors,
        shippingCharge,
        couponValue,
        refreshCart
    } = useContext(CartContext);

    useEffect(() => {
        refreshCart(cart);

        return () => {
            clearErrors();
        };
        // eslint-disable-next-line
    }, [cart]);

    //Get the total cost in carty
    const totalCost =
        cart?.length > 0 &&
        cart
            .map(item => (item.price - item.deduction) * item.qty)
            .reduce((prev, next) => parseInt(prev) + parseInt(next), 0);

    //Get percentage amount to be deducted
    const couponWorth =
        cart?.length > 0 &&
        cart
            .map(item => (item.price - item.deduction) * item.qty)
            .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) *
            (couponValue / 100);

    //Cost after deducting coupon value if any
    const totalCostAfterCoupon = totalCost && totalCost - couponWorth;

    //Total amount to pay
    const totalAmountToPay =
        totalCostAfterCoupon && totalCostAfterCoupon + shippingCharge;

    return (
        <div className="flex justify-center my-6">
            {cart.length < 1 ? (
                <EmptyCart />
            ) : (
                <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                    {errors && <i className="text-red-600">{errors}</i>}
                    <div className="flex-1">
                        <table
                            className="w-full text-sm lg:text-base"
                            cellSpacing="0"
                        >
                            <thead>
                                <tr className="h-12 uppercase">
                                    <th className="hidden md:table-cell"></th>
                                    <th className="text-left">Product</th>
                                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                                        <span
                                            className="lg:hidden"
                                            title="Quantity"
                                        >
                                            Qty
                                        </span>
                                        <span className="hidden lg:inline">
                                            Quantity
                                        </span>
                                    </th>
                                    <th className="hidden text-right md:table-cell">
                                        Unit price
                                    </th>
                                    <th className="text-right">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.length > 0 &&
                                    cart.map(item => {
                                        return (
                                            <CartRow
                                                item={item}
                                                key={item.id}
                                            />
                                        );
                                    })}
                            </tbody>
                        </table>
                        <hr className="pb-6 mt-6" />
                        <div className="mb-4 mt-6 max-w-xl place-content-center m-auto">
                            <div className="">
                                <ShippingCharge />
                            </div>
                            <div className="mt-6">
                                <ApplyCoupon />
                            </div>
                            <div className="lg:px-2">
                                <div className="p-4 bg-gray-50">
                                    <h1 className="font-bold uppercase text-center">
                                        Order Details
                                    </h1>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Subtotal
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            {totalCost &&
                                                Formatter.format(totalCost)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                                            Coupon
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                                            {couponValue
                                                ? `${couponValue}%`
                                                : "-"}
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            New Subtotal
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            {/* substract coupon value here */}
                                            {totalCost &&
                                                Formatter.format(
                                                    totalCost - couponWorth
                                                )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Shipping Charge
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            {shippingCharge
                                                ? Formatter.format(
                                                      shippingCharge
                                                  )
                                                : "-"}
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 border-b">
                                        <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                            Total
                                        </div>
                                        <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                            {totalAmountToPay &&
                                                Formatter.format(
                                                    totalAmountToPay
                                                )}
                                        </div>
                                    </div>
                                    <div>
                                        <CartCheckOutButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
