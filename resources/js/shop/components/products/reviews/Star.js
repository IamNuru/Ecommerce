import React from "react";

const Star = props => {
    const { val } = props;

    return (
        <>
            {[...Array(val)].map((v, index) => {
                return (
                    <i className={`fa fa-star pl-1`} key={index}></i>
                );
            })}
        </>
    );
};

export default Star;
