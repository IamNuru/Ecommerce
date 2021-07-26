import React, { Fragment, useState } from "react";
import Formatter from "../../../inc/Formatter";
import "../../../../styles/style.css";
import { Link } from "react-router-dom";

const Order = props => {
    const { item } = props;
    const [openOrder, setOpenOrder] = useState(false);

    return (
        /* : item.map((transaction, index) => { */
        <Fragment>
            {item === null ? (
                "Loading"
            ) : (
                <div
                    className={`w-full block transition duration-500 py-1 px-1 shadow-md mb-4`}
                >
                    <div
                        className={`${openOrder &&
                            "p-2 shadow-md"} flex justify-between cursor-pointer`}
                        onClick={() => setOpenOrder(!openOrder)}
                    >
                        <div className="flex-grow text-left text-green-600">
                            <span className="text-gray-600">order number:</span>{" "}
                            {item.transaction_id}
                        </div>
                        <div className="flex-grow text-sm italic text-right text-green-600">
                            {item.status}
                        </div>
                        <i
                            className={`text-center px-2 py-1 cursor-pointer text-xl text-purple-600 font-semibold fa fa-angle-${
                                openOrder ? "down" : "up"
                            }`}
                        ></i>
                    </div>
                    <div
                        className={`close-box ${openOrder &&
                            "open-box"} overflow-auto`}
                    >
                        {item.orders.length > 0 &&
                            item.orders.map((i, index) => {
                                return (
                                    <div key={index} className="">
                                        {i.products.length > 0 &&
                                            i.products.map((p, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="shadow-md pb-4"
                                                    >
                                                        <div className="p-2 block bg-blue-300">
                                                            <div className="flex justify-left">
                                                                <img
                                                                    src={`${process.env.MIX_APP_URL}/storage/images/products/${p.image}`}
                                                                    alt={
                                                                        p.price
                                                                    }
                                                                    className="flex-shrink-0 w-14 h-14 mr-2"
                                                                />
                                                                <div className="mt-6 pl-2 font-semibold">
                                                                    {p.title}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4 block">
                                                            <div className="pb-2 flex flex-wrap justify-between">
                                                                <div className="block">
                                                                    <div className="text-md pl-1 text-gray-500">
                                                                        Price
                                                                    </div>
                                                                    <div className="text-gray-800">
                                                                        {p.price }
                                                                    </div>
                                                                </div>
                                                                <div className="block">
                                                                    <div className="text-sm pl-1 text-gray-500">
                                                                        Quantity
                                                                    </div>
                                                                    <div className="text-gray-800">
                                                                        {i.qty}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="ml-4 mb-2 block">
                                                            <div className="text-md text-center bg-gray-100 py-1">
                                                                Description
                                                            </div>
                                                            <div className="p-1">
                                                                {p.description}
                                                            </div>
                                                            {item.status ==
                                                                "placed" && (
                                                                <div className="p-1 w-full text-right">
                                                                    <Link
                                                                        to={`/account/product/${p.id}/review`}
                                                                        className="px-2 bg-yellow-200 text-pink-600 py-1 hover:bg-yellow-600 hover:text-white transition duration-400"
                                                                    >
                                                                        Rate
                                                                        Product
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                        <div className="w-full font-semibold text-md text-right py-1 bg-gray-800 text-white pr-2">
                            {Formatter.format(item.amount)}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Order;
