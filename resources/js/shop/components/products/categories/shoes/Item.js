import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../../context/cart/Context";
const Item = (props) => {
  const cartContext = useContext(CartContext);
  const { cart, addToCart, removeFromCart } = cartContext;

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
  return (
    <div className="w-full font-serif">
      <div className="c-card p-1 h-full block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
        <div className="relative pb-48 overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={`${process.env.MIX_APP_URL}/storage/images/products/${product.image}`}
              alt={product.title}
            />
          </Link>
        </div>
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h2 className="mt-2 mb-2 font-serif font-semibold hover:text-red-600 transition duration-600">
              {product.title}
            </h2>
          </Link>

          <div className="mt-3 flex items-center">
            <div className="font-light block">
              <h2 className="text-md">{formatter.format(parseInt(product.price)-parseInt(product.deduction))}</h2>
              { product.deduction && product.deduction > 0 &&
                <h2 className="text-xs line-through">{formatter.format(product.price)}</h2>
              }
            </div>
            &nbsp;
          </div>
        </div>
        <div className="p-4 border-t border-b text-gray-700">
          {cart?.length > 0 &&
          cart.filter((item) => item.id === product.id).length > 0 ? (
            <div
              onClick={removeProductFromCart}
              className="cursor-pointer bg-pink-200 text-pink-700 font-semibold text-md w-full mx-1 px-4 text-center py-1"
            >
              Remove from Cart
            </div>
          ) : (
            <div
              onClick={addProductToCart}
              className="cursor-pointer bg-purple-200 text-purple-700 font-semibold text-md w-full mx-1 px-4 text-center py-1"
            >
              Add to Cart
            </div>
          )}
        </div>
        <div className="p-4 flex items-center text-sm text-gray-600">
         
          {
            product.reviews?.length > 0 ? <span className="ml-2">{product.reviews.length}{" "}{product.reviews.length > 1 ? "Reviews":"Review"}</span> : <span className="ml-2 capitalize">No Reviews Yet</span>
          }
        </div>
      </div>
    </div>
  );
};

export default Item;
