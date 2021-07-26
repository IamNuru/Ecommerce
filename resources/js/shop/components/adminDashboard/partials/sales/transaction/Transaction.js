import React, { useEffect, useContext } from "react";
import AdminContext from "../../../../context/admin/Context";
import LoadingGif from "../../../../inc/LoadingGif";
import User from "./User";
import Order from "./Order";
import Detail from "./Detail";
import "../../../../../styles/style.css"

const Transaction = props => {
    const { transaction, getTransaction, setTransactionToNull, setLoading , loading} = useContext(
        AdminContext
    );

    useEffect(() => {
        setLoading(true)
        getTransaction(props && props.match.params.id);
        return () => {
            setTransactionToNull();
        };
    }, [props]);

    return (
        <div className="w-full p-4">
            {!loading ?
            transaction !== null ? (
                <div className="block">
                    <div className="w-full max-h-56 text-center">
                        <i className={`fa fa-${transaction.status ==="processing" 
                        ? 'spinner rotating text-yellow-600' 
                        : transaction.status ==="onTransit" ? 'car moving text-pink-600'
                        : transaction.status ==="placed" ? 'shopping-cart text-green-600'
                        : transaction.status ==="ready" ? 'home text-green-600'
                        : transaction.status ==="completed" ? 'check text-green-600'
                        :''
                        } text-5xl`}></i>
                    </div>
                    {/* user */}
                    <div className="shadow-doka p-4 my-8">
                        <h2 className="w-full text-center font-medium text-xl">Person</h2>
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
                                return <Order order={order} key={order.id} />;
                            })
                        ) : (
                            <h2 className="text-center">
                                No order for this transaction
                            </h2>
                        )}
                    </div>
                </div>
            ) : (
                <h2 className="text-center">No Data Available</h2>
            ): (
                <LoadingGif />
            )}
        </div>
    );
};

export default Transaction;
