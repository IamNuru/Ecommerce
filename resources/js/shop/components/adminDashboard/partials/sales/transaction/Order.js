import React from "react";

const Order = props => {
    const { order } = props;

    return order ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex">
                <div className="flex flex-wrap px-8 py-4">
                    <div className="text-gray-600 px-2">Quantity : </div>
                    <div className="font-semibold">{order.qty && order.qty}</div>
                </div>
                {order.products?.length > 0 &&
                    order.products.map(product => {
                        return <div key={product.id} className="">
                            <div className="flex flex-wrap px-8 py-4">
                                <div className="text-gray-600 px-2">
                                    Title :{" "}
                                </div>
                                <div>
                                    {product.title && product.title}
                                </div>
                            </div>
                            <div className="flex flex-wrap px-8 py-4">
                                <div className="text-gray-600 px-2">
                                    Price :{" "}
                                </div>
                                <div>
                                    {product.price && product.price}
                                </div>
                            </div>
                            <div className="flex flex-wrap px-8 py-4">
                                <div className="text-gray-600 px-2">
                                    Deduction :{" "}
                                </div>
                                <div>
                                    {product.deduction &&
                                        product.deduction}
                                </div>
                            </div>
                            <div className="flex flex-wrap px-8 py-4">
                                <div className="text-gray-600 px-2">
                                    Days of delivery :{" "}
                                </div>
                                <div>
                                    {product.days_of_delivery &&
                                        product.days_of_delivery}
                                </div>
                            </div>
                            <div className="flex flex-wrap px-8 py-4">
                                <div className="text-gray-600 px-2">
                                    Brand :{" "}
                                </div>
                                <div>
                                    {product.brand && product.brand}
                                </div>
                            </div>
                        </div>;
                    })}
            </div>
        </div>
    ) : (
        <h2 className="text-center w-full mt-4 ">Loading</h2>
    );
};

export default Order;
