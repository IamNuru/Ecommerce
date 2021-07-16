import React, { useEffect, useContext, useState } from "react";
import { Zoom } from "react-slideshow-image";
import ProductsContext from "../context/products/ProductsContext";
import CartContext from "../context/cart/CartContext";
import Item from "./Item";
import formatter from "../inc/Formatter";
import LoadingGif from "../inc/LoadingGif";
import ProductFeedBacks from "./reviews/ProductFeedBacks";

const SingleProduct = props => {
    const {
        setProductToNull,
        loading,
        getProduct,
        product,
        getRelatedProducts,
        relatedProducts,
        setLoading
    } = useContext(ProductsContext);
    const { cart, addToCart, removeFromCart, wishList } = useContext(
        CartContext
    );

    const zoomOutProperties = {
        indicators: true,
        scale: 0.4,
        indicators: i => <div className="indicator">{i + 1}</div>
    };

    

    useEffect(() => {
        setLoading(true);
        const getSingleProduct = async () => {
            await getProduct(props.match.params.id);
            await getRelatedProducts(props.match.params.id);
        };
        getSingleProduct();

        return () => {
            setProductToNull();
        };

        // eslint-disable-next-line
    }, [props.match.params.id]);

    return (
        <div className="block md:flex">
            <div className="w-full p-4 md:min-w-96">
                {!loading ? (
                    product !== null ? (
                        <>
                            <h2 className="w-full text-center font-semibold text-xl">
                                {product.title}
                            </h2>
                            <div className="w-full mb-2 h-48 md:h-96 block">
                                <Zoom {...zoomOutProperties}>
                                    <div>
                                    <img
                                        src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
                                        alt={product.title}
                                        className="w-full h-full p-2 object-contain"
                                    /><img
                                    src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
                                    alt={product.title}
                                    className="w-full h-full p-2 object-contain"
                                />
                                    </div>
                                </Zoom>
                                
                            </div>
                            {product.qty < 1 ? (
                                <div className="text-red-600 italic text-sm text-left">
                                    The product is currently out of stock
                                </div>
                            ) : (
                                <div className="block md:flex justify-between">
                                    <span className="mr-4">
                                        Price:{" "}
                                        {product.deduction ? (
                                            <>
                                                <span className="line-through text-red-500">
                                                    {formatter.format(
                                                        product.price
                                                    )}
                                                </span>
                                                <span>
                                                    {" "}
                                                    {formatter.format(
                                                        product.price -
                                                            product.deduction
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            formatter.format(product.price)
                                        )}
                                    </span>
                                    {cart?.length > 0 &&
                                    cart.filter(item => item.id === product.id)
                                        .length > 0 ? (
                                        <span
                                            className="inline-block bg-gray-200 px-3 py-1 text-md font-semibold text-pink-500 mr-2 mb-2 cursor-pointer"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        >
                                            Remove From Cart
                                        </span>
                                    ) : (
                                        <span
                                            className="inline-block bg-gray-200 px-3 py-1 text-md font-semibold text-pink-500 mr-2 mb-2 cursor-pointer"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </span>
                                    )}
                                </div>
                            )}
                            <div>
                                <p className="">{product.description}</p>
                            </div>
                        </>
                    ) : (
                        <div className="w-full mt-8 py-16 text-center mb-8">
                            Product Not Found
                        </div>
                    )
                ) : (
                    <div className="block h-48 md:h-96 w-full m-auto mt-8 mb-8 text-center">
                        <LoadingGif />
                    </div>
                )}
                <ProductFeedBacks />
                {wishList.length > 0 && (
                    <div className="block">
                        <h2 className="font-semibold py-2 pl-1 text-xl">
                            Wish List
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full">
                            {wishList.map((wish, index) => {
                                return <Item product={wish} key={index} />;
                            })}
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full p-4 md:w-96 shadow rounded-md block">
                <h2 className="font-semibold">Products you might like</h2>
                {relatedProducts !== null
                    ? relatedProducts.length > 0
                        ? relatedProducts.map((item, index) => {
                              return <Item product={item} key={index} />;
                          })
                        : "No related products"
                    : "Loading"}
            </div>
        </div>
    );
};

export default SingleProduct;
