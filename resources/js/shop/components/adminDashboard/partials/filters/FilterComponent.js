import React, { useRef } from "react";

const FilterComponent = props => {
    /* const { getFilteredItems, getItems } = props; */

    const text = useRef("");

    //handle what the user types in
    const handleSearchInputChanges = e => {
        e.preventDefault();
        if (text.current.value !== "") {
            getFilteredItems(text.current.value);
        } else {
            getItems();
        }
    };

    return (
        <>
            <form onSubmit={handleSearchInputChanges} className="flex">
                <input
                    required
                    ref={text}
                    onChange={handleSearchInputChanges}
                    type="text"
                    placeholder="Search"
                    className="pl-2 py-1.5 w-full mr-2 border border-gray-300 focus:border-purple-300 outline-none"
                />
                <button
                    type="submit"
                    className="outline-none bg-blue-600 py-1 text-white px-4 text-times font-semibold"
                >
                    search
                </button>
            </form>
        </>
    );
};

export default FilterComponent;
