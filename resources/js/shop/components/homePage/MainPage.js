import React, { useContext } from "react";
import CartContext from "../context/cart/CartContext";
import MiniCart from "../cart/MiniCart";
import Home from "./Main";

const MainPage = props => {
    const { wishList, cart } = useContext(CartContext);

    return (
        <div className="block md:flex p-2">
            <Home />
            <div className="hidden lg:block w-64">
                <div className="w-full">
                    {cart && cart.length > 0 ? (
                        <MiniCart />
                    ) : (
                        <p className="text-md text-gray-700">
                            You are yet to add something to your cart. Start adding stuffs to your cart
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
