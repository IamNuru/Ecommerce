import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import UserContext from "../../context/user/Context";
import DestinationContext from "../../context/destination/Context";

const Shipping = () => {
    const { user } = useContext(UserContext);
    const {
        getDestinations,
        setShippingCharge,
        destinations,
        getDestination,
        destination
    } = useContext(DestinationContext);

    //set state variables
    const [destinationId, setDestinationId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            user.destination_id !== null
                ? setDestinationId(parseInt(user.destination_id))
                : setDestinationId("");
        } else {
            setShippingCharge(0);
        }
    }, [user]);

    //get destinations
    useEffect(() => {
        getDestinations();
    }, []);

    //get selected destination
    useEffect(() => {
        getDestination(destinationId);
        if (destination) {
            setShippingCharge(destination.amount);
            setLoading(false);
        } else {
            setShippingCharge(0);
            setLoading(false);
        }
    }, [destinationId]);

    //When Destination is selected
    const onDestinationSelect = e => {
        setDestinationId(parseInt(e.target.value));
    };

    return (
        <div className="block">
            <label className="text-md text-gray-800">Select Destination</label>
            <select
                value={destinationId}
                className="border border-gray-400 w-full py-1 px-1 outline-none focus:border-purple-300"
                onChange={onDestinationSelect}
            >
                <option value="">Select destination</option>
                {destinations?.length > 0 ? (
                    destinations.map((des, index) => {
                        return (
                            <option value={des.id} key={index} index={index}>
                                {des.name}
                            </option>
                        );
                    })
                ) : (
                    <option value="">No destination</option>
                )}
            </select>
            {destination && destinationId !== "" && (
                <div className="my-1 p-2 shadow-md border border-gray-100 flex flex-wrap justify-between">
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">
                            Name :{" "}
                        </label>
                        <span>{destination.name}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">
                            Pick up Station :{" "}
                        </label>
                        <span>{destination.station}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">
                            Charge :{" "}
                        </label>
                        <span>{destination.amount}</span>
                    </div>
                    <div className="flex">
                        <label className="italic text-gray-400 px-2 ">
                            Arrival date :{" "}
                        </label>
                        <span>{destination.number_of_days}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shipping;
