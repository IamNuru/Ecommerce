import React from "react";

const Detail = props => {
    const { transaction } = props;
    return transaction ? (
        <div className="flex flex-wrap">
            <div className="flex flex-wrap px-8 py-4">
                <div className="text-gray-600 px-2">Transaction ID : </div>
                <div>
                    {transaction.transaction_id && transaction.transaction_id}
                </div>
            </div>
            <div className="flex flex-wrap px-8 py-4">
                <div className="text-gray-600 px-2">Payment Method: </div>
                <div>
                    {transaction.payment_method && transaction.payment_method}
                </div>
            </div>
            <div className="flex flex-wrap px-8 py-4">
                <div className="text-gray-600 px-2">Amount: </div>
                <div>
                    {transaction.amount && transaction.amount}
                </div>
            </div>
            <div className="flex flex-wrap px-8 py-4">
                <div className="text-gray-600 px-2">Status: </div>
                {transaction.status &&
                <div className={`${transaction.status==="placed" 
                ? "text-green-600" 
                : transaction.status==="onTransit" ? "text-red-600"
                : transaction.status==="completed" ? "text-pink-600"
                : transaction.status==="processing" ? "text-yellow-600"
                : "text-black"
            } capitalize`}>
                    {transaction.status} 
                </div>
                }
            </div>
        </div>
    ) : (
        <h2 className="text-center">Nothing to show</h2>
    );
};

export default Detail;
