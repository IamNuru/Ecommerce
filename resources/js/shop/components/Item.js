import React, { useContext } from "react";
import CartContext from "./context/cart/CartContext";
const Item = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
  });

  const cartContext = useContext(CartContext);
  const { cart, addToCart, removeFromCart } = cartContext;

  const { product } = props;

  const addProductToCart = () => {
    addToCart(product);
  };

  const removeProductFromCart = () => {
    removeFromCart(product.id);
  };
  return (
    <div className="w-full p-4">
      <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`${process.env.MIX_REACT_APP_URL}/storage/images/products/${product.image}`}
            alt={product.title}
          />
        </div>
        <div className="p-4">
          <h2 className="mt-2 mb-2  font-bold">{product.title}</h2>
          <div className="mt-3 flex items-center">
            {product.deduction && (
              <span className="text-sm font-semibold line-through text-pink-600">
                {formatter.format(product.price)}
              </span>
            )}
            &nbsp;
            <span className="font-bold text-md text-purple-600">
              {product.deduction
                ? formatter.format(product.price - product.deduction)
                : formatter.format(product.price)}
            </span>
            &nbsp;
          </div>
        </div>
        <div className="p-4 border-t border-b text-gray-700">
          {cart.filter((item) => item.id === product.id).length > 0 ? (
            <div
              onClick={removeProductFromCart}
              className="cursor-pointer bg-pink-200 text-pink-700 font-bold text-md rounded w-full mx-2 px-4 text-center py-1"
            >
              Remove from Cart
            </div>
          ) : (
            <div
              onClick={addProductToCart}
              className="cursor-pointer bg-purple-200 text-purple-700 font-bold text-md rounded w-full mx-2 px-4 text-center py-1"
            >
              Add to Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
