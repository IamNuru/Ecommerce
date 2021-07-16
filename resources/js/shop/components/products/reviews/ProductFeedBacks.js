import React, { useState, useEffect, useContext } from "react";
import ProductContext from "../../context/products/ProductsContext";
import ProductStars from "./ProductStars";

const ProductFeedBacks = () => {
    const { product } = useContext(ProductContext);

    //set state variables
    const [sumOfProductRatings, setSumOfProductRatings] = useState(0);
    const [numberOfRatings, setNumberOfRatings] = useState(0);
    const [roundRate, setRoundRate] = useState(0);

    useEffect(() => {
        if (product && product.reviews.length > 0) {
            setSumOfProductRatings(
                product.reviews
                    .map(prod => prod.rating)
                    .reduce((prev, next) => parseInt(prev) + parseInt(next), 0)
            );
            setNumberOfRatings(product.reviews.length);
        }
    }, [product]);

    useEffect(() => {
        setRoundRate(Math.round(sumOfProductRatings / numberOfRatings));
    }, [sumOfProductRatings, numberOfRatings]);

    //calculate rate of product
    const calculateRate = () => {
        //find that product id in the previews table
        //sum all those products rating values
        //get number of users that rate the product
        //divide sum of product ratings by number of users
        //Round the number to the nearest whole number
        //set number number of stars to that value by passing the value into the stars component
    };

    return (
        <>
            {product && product.reviews.length > 0 ? (
                <div className="shadow-md bg-white py-4 my-2 border-t pb-8">
                    <div className="border-b pb-2 block">
                        <h2 className="text-lg font-semibold text-yellow-600 text-mono px-2">
                            Reviews
                        </h2>
                        {roundRate > 0 && (
                            <div>
                                <h2 className="text-md text-gray-800 text-monospace px-1">
                                    Rate(
                                    <span className="text-xs text-black">
                                        {numberOfRatings}
                                    </span>
                                    )
                                </h2>
                                {<ProductStars val={roundRate} def={5} />}{" "}
                                <span className="ml-1 text-xs">
                                    {roundRate} star{numberOfRatings > 1 && "s"}
                                </span>
                            </div>
                        )}
                    </div>
                    {product.reviews.map((rev, index) => {
                        return (
                            <div
                                className="mt-1 flex p-4 px-2 border-b"
                                key={index}
                            >
                                <div className="">
                                    <h2 className="font-semibold py-1 px-2 font-serif text-xl md:text-2xl h-16 w-16 rounded-full capitalize text-center bg-purple-400 text-pink-600">
                                        <p className="pt-4 m-auto">
                                            {(
                                                (rev.user.first_name &&
                                                    rev.user.first_name) ||
                                                rev.user.last_name ||
                                                "Unknown"
                                            ).slice(0, 1)}
                                        </p>
                                    </h2>
                                </div>

                                <div className="ml-1 flex-grow">
                                    <div className="block">
                                        <p className="text-xs capitalize text-left font-semibold">
                                            {(rev.user.first_name &&
                                                rev.user.first_name) ||
                                                rev.user.last_name ||
                                                "Unknown"}
                                        </p>
                                        <p className="font-mono">{rev.review}</p>
                                        {<ProductStars val={rev.user.product_review.rating} def={5} />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                "No Reviews Yet"
            )}
        </>
    );
};

export default ProductFeedBacks;
