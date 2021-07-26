import React, { useContext, useEffect } from "react";
import CategoryContext from "../../context/category/Context";
import Item from "../Item";
import PageNotFound from "../../inc/PageNotFound";
import LoadingGif from "../../inc/LoadingGif";

const CategoryProducts = (props) => {
  const {
    getCategoryProducts,
    catProducts,
    errors,
    clearMessages,
    loading,
    setLoading
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategoryProducts(props.match.params.cat);

    return(()=>{
      clearMessages();
      setLoading(true)
    })

    // eslint-disable-next-line
  }, [props.match.params.cat]);

  return (
    <>
      {errors === null || errors === "" ? (
        <div>
          <h2
            className={`${window.location.href === "http://localhost:8000/" &&
              "hidden"} text-center shadow-md mb-2 py-4 font-semibold text-xl font-serif w-full capitalize`}
          >
            {props.match.params.cat}
          </h2>
          {!loading ? (
            catProducts?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {catProducts.map((product, index) => {
                  return <Item product={product} key={index} />;
                })}
              </div>
            ) : (
              <div className="mt-20 w-full flex align-center justify-center">
                No data
              </div>
            )
          ) : (
            <div className="mt-20 w-full flex align-center justify-center">
              <LoadingGif />
            </div>
          )}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default CategoryProducts;
