import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/auth/Context";

const Address = () => {
    const { config } = useContext(AuthContext);
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //fetch user address book
    useEffect(() => {
        const fetchAddress = async() => {
            await axios
                .get(`${process.env.MIX_APP_API_URL}/user/address`, config)
                .then(res => {
                    setAddress(res.data);
                    setLoading(false)
                })
                .catch(err => {
                    setError(
                        "Ooops something went wrong whiles fetching your address information"
                    );
                    setLoading(false)
                });
        };
        fetchAddress()
    }, [config]);

    return (
        <div className="w-full">
            {!loading ? (
                address !== null ? (
                    <div className=" grid grid-cols-1 md:grid-cols-2 w-full md:w-2/3 lg:w-1/2 m-auto bg-gray-100 mt-1 h-full pb-32 pl-4">
                        <div className="flex py-2">
                            <label className="w-32 text-gray-600 text-right pr-4">
                                Country
                            </label>
                            <div className="ml-1">{address.country}</div>
                        </div>
                        <div className="flex py-2">
                            <label className="w-32 text-gray-600 text-right pr-4">
                                Region
                            </label>
                            <div className="ml-1">{address.state}</div>
                        </div>
                        <div className="flex py-2">
                            <label className="w-32 text-gray-600 text-right pr-4">
                                Town
                            </label>
                            <div className="ml-1">{address.city}</div>
                        </div>
                        <div className="flex py-2">
                            <label className="w-32 text-gray-600 text-right pr-4">
                                Box
                            </label>
                            <div className="ml-1">{address.box}</div>
                        </div>
                    </div>
                ) : (
                    <div className="error">{error}</div>
                )
            ) : (
                "loading"
            )}
        </div>
    );
};

export default Address;
