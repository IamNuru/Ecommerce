import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import ProductsContext from "../../context/products/ProductsContext";
import ReactPaginate from "react-paginate";

const ListProducts = () => {
  // destructure values from context
  const { products, getProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, []);

  // Set states
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);

  // cut results into pieces
  const slice = products !== null && products.slice(offset, offset + perPage);

  //handle page clicks
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

  return (
    <div>
      <table className="w-full text-sm lg:text-base" cellSpacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="hidden md:table-cell"></th>
            <th className="text-left">Title</th>
            <th className="text-center pl-5 lg:pl-0">Price</th>
            <th className="hidden md:table-cell text-center pl-5 lg:pl-0">
              deduction
            </th>
            <th className="text-center">qty</th>
            <th className="text-right"></th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 &&
            slice.map((product, index) => {
              return <Product product={product} key={index} />;
            })}
        </tbody>
      </table>
      {products !== null && products.length > 0 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(products !== null && products.length / perPage)}
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

export default ListProducts;
