import React from "react";

const ProductStars = props => {
    const { val, def } = props;

    return (
        <>
            {[...Array(def)].map((v, index) => {
                return (
                    <i className={`fa fa-star text-gray-500 pl-1 ${val > index && "text-yellow-600"}`} key={index}></i>
                );
            })}
        </>
    );
};

export default ProductStars;
