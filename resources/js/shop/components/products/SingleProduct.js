import React, { useEffect, useContext } from "react";
import Carousel from "react-elastic-carousel";
import ProductsContext from "../context/products/Context";
import CartContext from "../context/cart/Context";
import Item from "./Item";
import formatter from "../inc/Formatter";
import LoadingGif from "../inc/LoadingGif";
import ProductFeedBacks from "./reviews/ProductFeedBacks";
import "../../styles/Sliders.css";

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
        <div className="block lg:flex">
            <div className="w-full p-4 md:min-w-96">
                {!loading ? (
                    product !== null ? (
                        <>
                            <h2 className="w-full text-center font-medium text-black serif text-xl">
                                {product.title}
                            </h2>
                            <div className="w-full max-h-80 mb-16">
                                <Carousel itemsToShow={1}>
                                    <div className="w-full max-h-80" style={{minHeight:"300px"}}>
                                        <p className="w-full text-xs text-gray-400 pt-1 text-center capitalize">Image</p>
                                        <img
                                            src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
                                            alt={product.title}
                                            className="w-full max-h-80 object-fill md:object-contain"
                                            style={{minHeight:"300px"}}
                                        />
                                    </div>
                                    {product.front_image && (
                                        <div className="w-full max-h-80">
                                            <p className="w-full text-xs text-gray-400 pt-1 text-center">Front View</p>
                                            <img
                                                src={`${process.env.MIX_APP_URL}/storage/images/products/${product.front_image}`}
                                                alt={product.title}
                                                className="w-full max-h-80 object-fill md:object-contain"
                                            />
                                        </div>
                                    )}
                                    {product.back_image && (
                                        <div className="w-full max-h-80">
                                            <p className="w-full text-xs text-gray-400 pt-1 text-center capitalize">Back View</p>
                                            <img
                                                src={`${process.env.MIX_APP_URL}/storage/images/products/${product.back_image}`}
                                                alt={product.title}
                                                className="w-full max-h-80 object-fill md:object-contain"
                                            />
                                        </div>
                                    )}
                                    {product.side1_image && (
                                        <div className="w-full max-h-80">
                                            <p className="w-full text-xs text-gray-400 pt-1 text-center capitalize">Side View</p>
                                            <img
                                                src={`${process.env.MIX_APP_URL}/storage/images/products/${product.side1_image}`}
                                                alt={product.title}
                                                className="w-full max-h-80 object-fill md:object-contain"
                                            />
                                        </div>
                                    )}
                                    {product.side2_image && (
                                        <div className="w-full max-h-80">
                                            <p className="w-full text-xs text-gray-400 pt-1 text-center capitalize">
                                                Side View
                                            </p>
                                            <img
                                                src={`${process.env.MIX_APP_URL}/storage/images/products/${product.side2_image}`}
                                                alt={product.title}
                                                className="w-full max-h-80 object-fill md:object-contain"
                                            />
                                        </div>
                                    )}
                                </Carousel>
                            </div>

                            {product.qty < 1 ? (
                                <div className="text-red-600 italic text-sm text-left">
                                    The product is currently out of stock
                                </div>
                            ) : (
                                <div className="block md:flex justify-between border-t border-b border-gray-200 py-2 px-1">
                                    <span className="mr-4">
                                        Price:{" "}
                                        {product.deduction && parseInt(product.deduction) > 0.01 ? (
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
                                            className="inline-block bg-gray-200 px-3 text-md font-medium text-pink-500 mr-2 cursor-pointer"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        >
                                            Remove From Cart
                                        </span>
                                    ) : (
                                        <span
                                            className="inline-block bg-gray-200 px-3 text-md font-medium text-pink-500 mr-2 cursor-pointer"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="my-4 block">
                                <h2 className="w-full shadow-md font-semibold text-md text-center py-2">Product Description</h2>
                                <p className="py-2 pl-4">{product.description}</p>
                            </div>
                        </>
                    ) : (
                        <div className="w-full mt-8 py-16 text-center mb-8">
                            Product Not Found
                        </div>
                    )
                ) : (
                    <div className="block h-48 md:h-96 w-full mx-auto mt-8 mb-8 text-center">
                        <LoadingGif />
                    </div>
                )}
                <ProductFeedBacks />
                {wishList.length > 0 && (
                    <div className="mt-2 block">
                        <h2 className="font-medium py-2 pl-1 text-xl">
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
                <h2 className="font-semibold text-center">Products you might like</h2>
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
