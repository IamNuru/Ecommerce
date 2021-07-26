import React, { useContext, useState, useEffect } from "react";
import CartContext from "../context/cart/Context";

const CartRow = (props) => {
  const { item } = props;

  const cartContext = useContext(CartContext);
  const { errors, removeFromCart, increaseCartItemQty, decreaseCartItemQty } =
    cartContext;

  const [qty, setQty] = useState(1);

  const increment = () => {
    increaseCartItemQty(item.id);
  };
  const decrement = () => {
    decreaseCartItemQty(item.id);
  };
  const calculatePrice = (e) => {
    setQty(e.target.value);
  };

  useEffect(() => {
    setQty(item.qty);
    // eslint-disable-next-line
  }, [increaseCartItemQty, decreaseCartItemQty]);

  return props.item === null ? (
    "Loading"
  ) : (
    <tr className={`${errors?.length > 0 && errors === `${item.title} is currently out of stock` && 'disabled'}
    border-8 border-l-4 border-r-4 border-white hover:bg-gray-200 hover:border-gray-200 transition duration-600`}>
      <td className="hidden pt-4 pb-4 md:table-cell">
        <div>
          <img
            src={`${process.env.MIX_APP_URL}/storage/images/products/${item.image}`}
            className="w-20 rounded"
            alt="Thumbnail"
          />
        </div>
      </td>
      <td>
        <div>
          <p className="md:ml-4">{item.title}</p>
          <div
            className="cursor-pointer ml-4 font-semibold text-pink-600"
            onClick={() => {
              removeFromCart(item.id);
            }}
          >
            <span className="fa fa-trash text-pink-800 px-2"></span>
            <span className="hidden md:inline-block">Remove item</span>
          </div>
        </div>
      </td>
      <td className="justify-center md:justify-end md:flex mt-6 md:pt-6">
        <div className="w-20 h-10">
          <div className="relative flex flex-row w-full">
            <i
              className={`${
                qty < 2 && "invisible"
              } fa fa-minus-circle p-1 text-pink-600 text-md mr-1 
            text-center cursor-pointer bg-gray-200 rounded-full`}
              onClick={decrement}
            ></i>
            <input
              type="text"
              value={qty}
              disabled
              onChange={calculatePrice}
              className="w-6 font-semibold text-center text-gray-700 bg-gray-200 outline-none"
            />
            <i
              className={`${
                qty > 10 && "hidden"
              } fa fa-plus-circle p-1 text-purple-900 text-md ml-1 
            text-center cursor-pointer bg-gray-200 rounded-full`}
              onClick={increment}
            ></i>
          </div>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">
          {item.price.toLocaleString()}
        </span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">
          {item.deduction ? ((item.price-item.deduction) * qty).toLocaleString():(item.price * qty).toLocaleString()}
        </span>
      </td>
    </tr>
  );
};

export default CartRow;
