import React from "react";

const Address = props => {
    const { address } = props;

    return address ? (
        <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Country</div>
                <div className="px-4 py-2">{address && address.country}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">State</div>
                <div className="px-4 py-2">{address && address.state}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">City</div>
                <div className="px-4 py-2">{address && address.city}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Box</div>
                <div className="px-4 py-2">{address && address.box}</div>
            </div>
        </div>
    ) : (
        <h2 classNameName="text-center w-full mt-4 ">Loading</h2>
    );
};

export default Address;
