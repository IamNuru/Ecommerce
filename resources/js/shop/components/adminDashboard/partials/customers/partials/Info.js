import React from "react";

const Info = props => {
    const { user } = props;

    return user ? (
        <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">{user && user.first_name}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">{user && user.last_name}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">
                    {user && user.gender === "m" ? "Male" : "Female"}
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Phone</div>
                <div className="px-4 py-2">{user && user.phone}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">{user && user.email}</div>
            </div>
        </div>
    ) : (
        <h2 classNameName="text-center w-full mt-4 ">Loading</h2>
    );
};

export default Info;
