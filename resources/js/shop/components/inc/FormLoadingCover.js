import React from "react";
import LoadingGif from "./LoadingGif"

const FormLoadingCover = () => {
    return (
        <div
            id="cover"
            className={`w-full fixed transition-all left-0 top-0 flex justify-center items-center z-20 h-screen bg-black bg-opacity-25`}
        >
            <LoadingGif />
        </div>
    );
};

export default FormLoadingCover;
