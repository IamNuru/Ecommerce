import React, { useEffect, useContext } from "react";
import AdminContext from "../../../context/admin/Context";
import LoadingGif from "../../../inc/LoadingGif";
import Transactions from "./partials/Transactions"
import Info from "./partials/Info"
import Order from "./partials/Order"
import Destination from "./partials/Destination"
import Address from "./partials/Address"
import Formatter from "../../../inc/Formatter";

const Customer = props => {
    const { customer, getCustomer, setCustomerToNull } = useContext(
        AdminContext
    );

    useEffect(() => {
        getCustomer(props && props.match.params.id);
        return () => {
            setCustomerToNull();
        };
    }, [props]);

    return (
        <div className="w-full p-4">
            {customer !== null ? (
                <div className="block">
                    <h2 className="w-full text-green-600 text-center underline font-medium font-serif">Spent</h2>
                    <div className="w-full max-h-56 text-center text-3xl font-semibold text-green-600">
                        {customer && Formatter.format(customer.total_purchases)}
                    </div>


                    {/* user */}
                    <div className="shadow-doka p-4 my-8">
                        <h2 className="w-full text-center font-medium text-xl">Person</h2>
                        {<Info user={customer} />}
                    </div>


                    {/* Customer transactions */}
                    <div className="shadow-doka p-4 my-8">
                        <h2 className="w-full text-center font-medium text-xl">
                            Transactions
                        </h2>
                        {<Transactions transactions={customer.transactions} />}
                    </div>




                    {/* Customer destination */}
                    <div className="shadow-doka p-4 my-8">
                        <h2 className="w-full text-center font-medium text-xl">
                            Destination
                        </h2>
                        <Destination destination={customer.destination} />
                    </div>


                    {/* Customer destination */}
                    <div className="shadow-doka p-4 my-8">
                        <h2 className="w-full text-center font-medium text-xl">
                            Address
                        </h2>
                        <Address address={customer?.address && customer.address} />
                    </div>
                </div>
            ) : (
                <LoadingGif />
            )}
        </div>
    );
};

export default Customer;
