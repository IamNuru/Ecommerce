import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/cart/CartContext";

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
    <div className="px-1 py-1 bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl mb-4">
      <Link to={`/product/${product.id}`}>
          <img
          loading="lazy"
          className="object-cover h-48 max-h-48 md:max-h-56 w-full"
          src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
          alt={product.title}
        />
        
      </Link>
      <div className="px-6 py-2">
        <Link to={`/product/${product.id}`}>
          <div className="font-bold text-md mb-2 hover:text-red-600 transition duration-500">
            {product.title}
          </div>
        </Link>
      </div>
      <div className="p-4">
        {wishList?.length > 0 &&
        wishList.some((wli) => wli.id === product.id) ? (
          <span
            className="cursor-pointer p-2 bg-purple-700 rounded-full px-1 py-1 text-sm font-semibold mr-2 mb-2"
            onClick={removeProductFromWishList}
          >
            &#128155;
          </span>
        ) : (
          <span
            className="cursor-pointer p-2 rounded-full px-1 py-1 text-sm font-semibold mr-2 mb-2"
            onClick={addProductToWishList}
          >
            <i className="fa fa-heart bg-white"></i>
            &#128155;
          </span>
        )}

        <span className="whitespace-nowrap inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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
