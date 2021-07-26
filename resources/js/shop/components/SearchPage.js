import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router";
import ProductsContext from "./context/products/Context";
import ReactPaginate from "react-paginate";
import Item from "./Item";
import emptyImage from "../images/emptyImage.svg";
import LoadingGif from "./inc/LoadingGif";


const SearchedItem = (props) => {
  //get text or searched  passed from url
  const query = new URLSearchParams(props.location.search);


  const productsContext = useContext(ProductsContext);
  const {
    setSearchchedItemToNull,
    searchProducts,
    searchedItems,
    setLoading,
    loading
  } = productsContext;

  
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(3);

  useEffect(() => {
    const fetchproducts = async () => {
      if (query.get('text')) {
        await searchProducts(query.get('text'));
      }
    };
    fetchproducts();

    return () => {
      setSearchchedItemToNull();
      setLoading(true)
    };
    // eslint-disable-next-line
  }, [props.match.params.txt]);

  const slice =
    searchedItems !== null && searchedItems.slice(offset, offset + perPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };
  return (
    <div className="block mb-24 mt-4">
      {!loading ? (
        searchedItems?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {slice.map((product, index) => (
              <Item product={product} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full md:2/3 text-center block md:px-16 px-4 grid md:grid-cols-2">
            <p className="mb-4 md:hidden"> Sorry Your search returns nothing</p>
            <img src={emptyImage} alt="No data" className="m-auto h-64" />
            <p className="text-left mt-16 hidden md:block"> Sorry Your search returns nothing</p>
          </div>
        )
      ) : (
        <div className="w-full flex align-center justify-center">
          {<LoadingGif />}
        </div>
      )}

      {searchedItems !== null && searchedItems.length > 0 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(
            searchedItems !== null && searchedItems.length / perPage
          )}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "pagination w-full bg-purple-500 flex justify-center"
          }
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"px-2"}
        />
      )}
    </div>
  );
};

export default withRouter(SearchedItem);
