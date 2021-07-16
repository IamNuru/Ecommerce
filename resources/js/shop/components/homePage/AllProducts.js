import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ProductsContext from "../context/products/ProductsContext";
import LoadingGif from "../inc/LoadingGif";
import Item from "./Item";
import HomePageShimmer from "../shimmers/HomePage";
import "../../styles/paginate.css"

const AllProducts = () => {
    const { loading, allproducts, getAllProducts, getProducts } = useContext(
        ProductsContext
    );

    useEffect(() => {
        getAllProducts();
        getProducts();

        // eslint-disable-next-line
    }, []);

    /**
     * handling paginations
     */
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(3);

    const slice = allproducts !== null && allproducts.slice(offset, offset + perPage);

    const handlePageClick = e => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    return (
        <>
            {!loading ? (
                allproducts !== null ? (
                    allproducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {slice.map((product, index) => {
                                return <Item product={product} key={index} />;
                            })}
                        </div>
                    ) : (
                        <div className="mt-20 w-full flex align-center justify-center">
                            No Data
                        </div>
                    )
                ) : (
                    <>
                        <div className="hidden md:grid">
                            <HomePageShimmer />
                        </div>
                        <div className="block md:hidden w-full flex align-center justify-center">
                            {<LoadingGif />}
                        </div>
                    </>
                )
            ) : (
                <>
                    <div className="hidden md:grid">
                        <HomePageShimmer />
                    </div>
                    <div className="block md:hidden w-full flex align-center justify-center">
                        {<LoadingGif />}
                    </div>
                </>
            )}
            {allproducts !== null && allproducts.length > 0 && (
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me bg-red-600"}
                    pageCount={Math.ceil(
                        allproducts !== null && allproducts.length / perPage
                    )}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                        "pagination w-full mt-4 flex justify-center"
                    }
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    pageClassName={"px-2"}
                />
            )}
        </>
    );
};

export default AllProducts;
