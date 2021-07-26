import React, { useState, useContext, useEffect } from "react";
import CartContext from "../../../context/cart/Context";
import "../../../../styles/style.css";
import Formatter from "../../../inc/Formatter"

const WishListItem = props => {
    const { item } = props;
    const { cart, addToCart, removeFromWishList } = useContext(CartContext);

    const [openItem, setOpenItem] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const foundInCart = cart.some(p => p.id === item.id);
        if (foundInCart) {
            setIsInCart(true);
        }

        // eslint-disable-next-line
    }, [isInCart]);
    const addItemToCart = () => {
        console.log("hellow");
        addToCart(item);
        setIsInCart(true);
    };
    return item === null ? (
        "Loading"
    ) : (
        <div
            className={`w-full block transition duration-500 py-3 px-1 shadow-md mb-2`}
        >
            <div
                className="flex justify-between cursor-pointer"
                onClick={() => setOpenItem(!openItem)}
            >
                <img
                    src={`${process.env.MIX_APP_URL}/storage/images/products/${item.image}`}
                    alt={item.price}
                    className="flex-shrink-0 w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-grow text-left">{item.title}</div>
                <i
                    className={`text-center px-2 py-1 cursor-pointer text-xl text-purple-600 font-semibold fa fa-angle-${
                        openItem ? "down" : "up"
                    }`}
                ></i>
            </div>
            <div
                className={`${
                    openItem ? "open-box" : "close-box"
                } overflow-hidden transition duration-500`}
            >
                <div className="p-4 flex justify-between">
                    {isInCart ? (
                        ""
                    ) : (
                        <div
                            className={`${isInCart &&
                                "hidden"} cursor-pointer bg-blue-600 px-4`}
                            onClick={addItemToCart}
                        >
                            Add to Cart
                        </div>
                    )}

                    <div
                        className="cursor-pointer bg-blue-300 px-4"
                        onClick={() => removeFromWishList(item.id)}
                    >
                        Remove
                    </div>
                </div>
                <div className="p-4 block">
                    <div className="text-sm pl-1 bg-gray-300 py-1">Price</div>
                    <div className="pl-2">
                        <div className="font-light block">
                            <h2 className="text-xl">
                                {Formatter.format(
                                    parseInt(item.price) -
                                        parseInt(item.deduction)
                                )}
                            </h2>
                            {item.deduction && item.deduction > 0 && (
                                <h2 className="text-xs line-through">
                                    {Formatter.format(item.price)}
                                </h2>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-4 block">
                    <div className="text-sm pl-1 bg-gray-300 py-1">
                        Description
                    </div>
                    <div className="pl-2">{item.description}</div>
                </div>
            </div>
        </div>
    );
};

export default WishListItem;
