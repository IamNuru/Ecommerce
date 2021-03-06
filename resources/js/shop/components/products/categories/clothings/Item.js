import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/cart/Context";

const Item = (props) => {
  const cartContext = useContext(CartContext);
  const {
    cart,
    addToCart,
    wishList,
    removeFromCart,
    addToWishList,
    removeFromWishList,
  } = cartContext;

  const { product } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
  });

  const addProductToCart = () => {
    addToCart(product);
  };

  const removeProductFromCart = () => {
    removeFromCart(product.id);
  };

  const addProductToWishList = () => {
    addToWishList(product);
  };

  const removeProductFromWishList = () => {
    removeFromWishList(product.id);
  };
  return (
    <div className="rounded shadow-lg font-serif">
      <div className="img">
        <Link to={`/product/${product.id}`}>
          <img
            className="object-cover w-full h-48 max-h-48"
            src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
            alt={product.title}
          style={{minHeight:"150px"}}/>
        </Link>
        {product.deduction && parseInt(product.deduction) > 0.01 &&(
          <div className="leading-normal -mt-48 z-10  mt-2 ml-2 absolute">
            <div
              className="line-through oldstyle-nums font-serif
             bg-red-500
            mb-2 mt-1 px-2 py-1 text-white"
            >
              {((product.deduction / product.price) * 100).toFixed(2)}% off
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-2">
        <Link to={`/product/${product.id}`}>
          <div className="font-medium font-serif text-md mb-2 hover:text-red-600 transition duration-500">
            {product.title}
          </div>
        </Link>
      </div>
      <div className="px-6 pt-2 pb-2">
        {wishList.length > 0 &&
        wishList.some((wli) => wli.id === product.id) ? (
          <span
            className="cursor-pointer p-2 px-1 py-1 text-sm font-semibold mr-2 mb-2"
            onClick={removeProductFromWishList}
          >
            <i className="fa fa-heart text-gray-400" title="Remove from wishlist"></i>
          </span>
        ) : (
          <span
            className="cursor-pointer p-2 px-1 py-1 text-sm font-semibold mr-2 mb-2"
            onClick={addProductToWishList}
          >
            <i className="fa fa-heart text-yellow-600" title="Add to wishlist"></i>
          </span>
        )}

        <span className="whitespace-nowrap inline-block bg-gray-200 rounded-full px-3 py-1 text-md font-medium text-gray-700 mr-2 mb-2">
          {product.deduction
            ? formatter.format(product.price - product.deduction)
            : formatter.format(product.price)}
        </span>
        {cart?.length > 0 &&
        cart.filter((item) => item.id === product.id).length > 0 ? (
          <span
            className="whitespace-nowrap inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-pink-500 mr-2 mb-2 cursor-pointer"
            onClick={removeProductFromCart}
          >
            Remove From Cart
          </span>
        ) : (
          <span
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-pink-500 mr-2 mb-2 cursor-pointer"
            onClick={addProductToCart}
          >
            Add to Cart
          </span>
        )}
      </div>
    </div>
  );
};

export default Item;
