import React, { useContext } from "react";
import CartContext from "../../context/cart/Context";
import MiniCart from "../../cart/MiniCart";
import AllProducts from "./AllProducts";
import SortProducts from "./SortProducts";

const AllProductsPage = props => {
    const { wishList, cart } = useContext(CartContext);

    return (
        <div className="block md:flex p-2">
            <div className="block flex-grow">
                <SortProducts />
                <AllProducts />
            </div>
            <div className="hidden lg:block w-64">
                <div className="w-full">
                    {cart && cart.length > 0 ? (
                        <MiniCart />
                    ) : (
                        <p className="p-4 text-md text-gray-700">
                            You are yet to add something to your cart. Start adding stuffs to your cart
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProductsPage;
