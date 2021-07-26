import React from "react";

const User = props => {
    const { user } = props;

    return user ? (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div className="flex flex-wrap">
                <div className="flex flex-wrap px-8 py-4">
                    <div className="text-gray-600 px-2">Name : </div>
                    <div>
                        {user.first_name && user.first_name}{" "}
                        {user.last_name && user.last_name}
                    </div>
                </div>
                <div className="flex flex-wrap px-8 py-4">
                    <div className="text-gray-600 px-2">Email : </div>
                    <div>{user.email}</div>
                </div>
                <div className="flex flex-wrap px-8 py-4">
                    <div className="text-gray-600 px-2">Gender : </div>
                    <div>{user.gender && user.gender}</div>
                </div>
                <div className="flex flex-wrap px-8 py-4">
                    <div className="text-gray-600 px-2">Name : </div>
                    <div>{user.phone && user.phone}</div>
                </div>
            </div>
            {user.destination && (
                <div className="block">
                    <h2 className="text-center w-full py-1 shadow-inner font-medium">
                        Destination Info
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="flex flex-wrap px-8 py-2">
                            <div className="text-gray-600 px-2">Name : </div>
                            <div>
                                {user.destination && user.destination.name}
                            </div>
                        </div>
                        <div className="flex flex-wrap px-8 py-2">
                            <div className="text-gray-600 px-2">Station : </div>
                            <div>
                                {user.destination && user.destination.station}
                            </div>
                        </div>
                        <div className="flex flex-wrap px-8 py-2">
                            <div className="text-gray-600 px-2">Phone : </div>
                            <div>
                                {user.destination && user.destination.phone}
                            </div>
                        </div>
                        <div className="flex flex-wrap px-8 py-2">
                            <div className="text-gray-600 px-2">Charged : </div>
                            <div>
                                {user.destination && user.destination.amount}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <h2 className="text-center w-full mt-4 ">Loading</h2>
    );
};

export default User;
