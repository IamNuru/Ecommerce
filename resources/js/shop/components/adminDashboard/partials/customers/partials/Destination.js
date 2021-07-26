import React from "react";

const Destination = props => {
    const { destination } = props;

    return destination ? (
        <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Name</div>
                <div className="px-4 py-2">{destination && destination.name}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Name</div>
                <div className="px-4 py-2">{destination && destination.station}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Phone</div>
                <div className="px-4 py-2">{destination && destination.phone}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Charge</div>
                <div className="px-4 py-2">{destination && destination.amount}</div>
            </div>
        </div>
    ) : (
        <h2 classNameName="text-center w-full mt-4 ">Loading</h2>
    );
};

export default Destination;
