import React, { useEffect, useState, useContext } from "react";
import axios from "axios"

import CartContext from "../context/cart/CartContext";
import AuthContext from "../context/auth/Context";

const ShippingCharge = () => {
    const {
        getDestinations,
        destinations,
        shippingCharge,
        setShippingCharge
    } = useContext(CartContext);
    const { logedin, user } = useContext(AuthContext);
    const [currentDestination, setCurrentDestination] = useState(null);
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getDestinations();
    }, []);

    //get selected destination
    useEffect(() => {
        const getSelectedDestination =  (destination) =>{
             axios.get(`${process.env.MIX_APP_API_URL}/destination/${destination}`, {
                headers: {
                    "Content-Type": "application/json",
                  },
             })
             .then(res =>{
                 setCurrentDestination(res.data)
                 setShippingCharge(res.data.amount)
                 setLoading(false)
             })
             .catch(err =>{
                setCurrentDestination(null)
                setShippingCharge(0)
                setLoading(false)
             })
        }
        destination !== "" && getSelectedDestination(destination)
    }, [destination])

    useEffect(() => {
        if (user) {
            user.destination !== null
                ? setDestination(user.destination)
                : setDestination("");
        }
    }, [user]);

    //When Destination is selected
    const onDestinationSelect = e => {
            setDestination(e.target.value);
        
    };

    return (
        <div className="block">
            <label className="text-md text-gray-800">Select Destination</label>
            <select
                value={destination}
                className="border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300"
                onChange={onDestinationSelect}
            >
                <option value="">Select destination</option>
                {destinations?.length > 0 ? (
                    destinations.map((des, index) => {
                        return (
                            <option
                                value={des.id}
                                key={index}
                                index={index}
                            >
                                {des.name}
                            </option>
                        );
                    })
                ) : (
                    <option value="">No destination</option>
                )}
            </select>
            {currentDestination && destination !== "" &&
                <div className="my-1 p-2 shadow-md border border-gray-100 flex flex-wrap justify-between">
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">Name : </label><span>{currentDestination.name}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">Pick up Station : </label><span>{currentDestination.station}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">Charge : </label><span>{currentDestination.amount}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">Arrival date : </label><span>{currentDestination.number_of_days}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default ShippingCharge;
