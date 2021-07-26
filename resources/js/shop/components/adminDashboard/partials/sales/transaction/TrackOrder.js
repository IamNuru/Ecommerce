import React, { useState, useEffect } from "react";
import LoadingGif from "../../../../inc/LoadingGif";
import User from "./User";
import Order from "./Order";
import Detail from "./Detail";
import axios from "axios";

const TrackOrder = () => {
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [errors, setErrors] = useState("");
    const [active, setActive] = useState(false);

    const onChange = e => {
        setId(e.target.value);
    };

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (id === "") {
            setError("Please Enter a transaction id");
        } else {
            setTransaction(null);
            setLoading(true);
            setErrors("");
            await axios
                .get(`${process.env.MIX_APP_API_URL}/transaction/${id}`, config)
                .then(res => {
                    if (
                        res.data &&
                        Object.keys(res.data).length === 0 &&
                        res.data.constructor === Object
                    ) {
                        setActive(false);
                        setLoading(false);
                        setErrors("No record Match your search");
                    } else {
                        setTransaction(res.data);
                        setLoading(false);
                        setActive(true);
                        setErrors("");
                    }
                })
                .catch(err => {
                    setErrors(err.response.errors);
                    setLoading(false);
                    setActive(false);
                });
        }
    };

    return (
        <div className="w-full p-4">
            <div className="w-full">
                <form onSubmit={onSubmit} className="flex">
                    <input
                        required
                        onChange={onChange}
                        value={id}
                        type="text"
                        placeholder="Search"
                        className="pl-2 py-1.5 w-full mr-2 border border-gray-300 focus:border-purple-300 outline-none"
                    />
                    <button
                        type="submit"
                        className="outline-none bg-blue-600 py-1 text-white px-4 text-times font-semibold"
                    >
                        search
                    </button>
                </form>
            </div>
            {active ? (
                !loading ? (
                    transaction !== null ? (
                        <div className={`${active ? "open-box" : "close-box"}`}>
                            <div className="w-full max-h-56 text-center">
                                <i
                                    className={`fa fa-${
                                        transaction.status === "processing"
                                            ? "spinner text-yellow-600"
                                            : transaction.status === "onTransit"
                                            ? "car text-pink-600"
                                            : transaction.status === "placed"
                                            ? "shopping-cart text-green-600"
                                            : transaction.status === "ready"
                                            ? "home text-green-600"
                                            : transaction.status === "completed"
                                            ? "check text-green-600"
                                            : ""
                                    } text-5xl`}
                                ></i>
                            </div>
                            {/* user */}
                            <div className="shadow-doka p-4 my-8">
                                <h2 className="w-full text-center font-medium text-xl">
                                    Person
                                </h2>
                                {<User user={transaction.user} />}
                            </div>

                            {/* Transaction details */}
                            <div className="shadow-doka p-4 my-8">
                                <h2 className="w-full text-center font-medium text-xl">
                                    Transaction Details
                                </h2>
                                {<Detail transaction={transaction} />}
                            </div>

                            {/* order details */}
                            <div className="shadow-doka p-4 my-8">
                                <h2 className="w-full text-center font-medium text-xl">
                                    Order Details
                                </h2>
                                {transaction.orders?.length > 0 ? (
                                    transaction.orders.map(order => {
                                        return (
                                            <Order
                                                order={order}
                                                key={order.id}
                                            />
                                        );
                                    })
                                ) : (
                                    <h2 className="text-center">
                                        No order for this transaction
                                    </h2>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            Transaction ID {id} Not Found
                        </div>
                    )
                ) : (
                    <LoadingGif />
                )
            ) : (
                <div className="text-center">
                    Please Enter Transaction ID in the search box
                </div>
            )}
            {errors && <div className="mt-4 text-center text-red-600">{errors}</div>}
        </div>
    );
};

export default TrackOrder;
