import { useReducer } from "react";
import CartReducer from "./CartReducer";
import CartContext from "./CartContext";
import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_CART_ITEM_QTY,
  DECREASE_CART_ITEM_QTY,
  CLEAR_CART,
  SET_COUPON_VALUE,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  ERRORS,
  CLEAR_ERRORS,
  SET_FORM_lOADING,
  GET_DESTINATIONS,
  SET_SHIPPING_CHARGE,
} from "../types";

const CartState = (props) => {
  const initialState = {
    cart: [],
    destinations: null,
    wishList: [],
    coupons: {
      NewComer: 5,
      loyal: 55,
      promo: 45,
    },
    couponValue: "",
    shippingCharge: 15,
    errors: null,
    formloading: false,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  //configuration
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (localStorage.getItem("cart")) {
    initialState.cart = initialState.cart.concat(
      JSON.parse(localStorage.getItem("cart"))
    );
  }
  if (localStorage.getItem("wish")) {
    initialState.wishList = initialState.wishList.concat(
      JSON.parse(localStorage.getItem("wish"))
    );
  }
  //actions
  const setLocalstorage = () => {
    if (localStorage.getItem("cart")) {
      initialState.cart = initialState.cart.concat(
        JSON.parse(localStorage.getItem("cart"))
      );
    }
  };
  //Add to cart
  const addToCart = ({ id, price, title, description, image, deduction }) => {
    dispatch({
      type: ADD_TO_CART,
      payload: Object.assign(
        { id, price, title, description, image, deduction },
        { qty: 1 }
      ),
    });
    //Add to local storage
    var scart = [];
    if (localStorage.getItem("cart")) {
      scart = JSON.parse(localStorage.getItem("cart"));
    }
    scart.push({
      id: id,
      image: image,
      price: price,
      deduction: deduction,
      qty: 1,
      title: title,
    });
    localStorage.setItem("cart", JSON.stringify(scart));
  };

  //Remove from cart
  const removeFromCart = (id) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });

    //remove from local storage
    if (localStorage.getItem("cart")) {
      let scart = JSON.parse(localStorage.getItem("cart"));
      let filteredScart = scart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(filteredScart));
    }
  };

  //Add to wish list
  const addToWishList = (product) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: product,
    });

    //Add to local storage
    var swishList = [];
    if (localStorage.getItem("wish")) {
      swishList = JSON.parse(localStorage.getItem("wish"));
      console.log('no');
    }
    swishList.push({
      id: product.id,
      image: product.image,
      price: product.price,
      qty: product.qty,
      title: product.title,
    });
    window.localStorage.setItem("wish", JSON.stringify(swishList));
  };

  //Remove item from wish list
  const removeFromWishList = (id) => {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: id,
    });

    //remove wish list item from local storage
    if (localStorage.getItem("wish")) {
      let swishList = JSON.parse(localStorage.getItem("wish"));
      let filteredSwishList = swishList.filter((item) => item.id !== id);
      localStorage.setItem("wish", JSON.stringify(filteredSwishList));
    }
  };

  //Increase cart item quantity
  const increaseCartItemQty = (id) => {
    dispatch({
      type: INCREASE_CART_ITEM_QTY,
      payload: id,
    });

    // handle local storage
    if (localStorage.getItem("cart")) {
      let scart = JSON.parse(localStorage.getItem("cart"));
      let fileredScart = scart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(fileredScart));
    }
  };

  //decrease cart item quantity
  const decreaseCartItemQty = (id) => {
    dispatch({
      type: DECREASE_CART_ITEM_QTY,
      payload: id,
    });

    // handle local storage
    if (localStorage.getItem("cart")) {
      let scart = JSON.parse(localStorage.getItem("cart"));
      let fileredScart = scart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(fileredScart));
    }
  };

  //push items to cart
  const refreshCart = async (cart) => {
    if(cart?.length > 0){
    const idsInCart =
      cart?.length > 0 &&
      cart.map((i) => {
        return i.id;
      });
    try {
      const res = await axios.get(
        `${process.env.MIX_APP_API_URL}/cart/items/${cart}?ids=${idsInCart}`,
        //`http://localhost:8000/api/cart/items?ids=${idsInCart}`,
        config
      );
      cart =
        res.data?.length > 0 &&
        cart.forEach((oldCartItem) => {
          let updatedCart = res.data.find(
            (newCartItem) => newCartItem.id === oldCartItem.id
          );
          
          if (updatedCart) {
            oldCartItem.price = updatedCart.price;
            oldCartItem.deduction = updatedCart.deduction;
            if (updatedCart.qty < 1) {
              dispatch({
                type: ERRORS,
                payload: `${updatedCart.title} is currently out of stock`,
              });
            } else if (updatedCart.qty < oldCartItem.qty) {
              dispatch({
                type: ERRORS,
                payload: `${updatedCart.title} Quantity requested is more than quantity available`,
              });
            }
          }
        });
    } catch (error) {}
  }
  };

  //get destinations
  const getDestinations = async () =>{
    await axios.get(`${process.env.MIX_APP_API_URL}/destinations`)
    .then(res =>{
      dispatch({
        type: GET_DESTINATIONS,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: ERRORS,
        payload: err.response.data
      })
    })
  }



  //clear cart
  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });

    // handle local storage
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }
  };

  //clearErrors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  //set the value of the coupon
  const setCouponValue = (coupon) => {
    dispatch({
      type: SET_COUPON_VALUE,
      payload: coupon,
    });
  };

  // set the value of the shipping charge
  const setShippingCharge = (charge) => {
    dispatch({
      type: SET_SHIPPING_CHARGE,
      payload: charge,
    });
  };



    //Set state of form when clicked
    const setFormLoading = (loadingValue) => {
      dispatch({
        type: SET_FORM_lOADING,
        payload:loadingValue
      });
    };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        destinations: state.destinations,
        wishList: state.wishList,
        coupons: state.coupons,
        couponValue: state.couponValue,
        shippingCharge: state.shippingCharge,
        errors: state.errors,
        formloading: state.formloading,
        addToCart,
        removeFromCart,
        addToWishList,
        removeFromWishList,
        increaseCartItemQty,
        decreaseCartItemQty,
        clearCart,
        setLocalstorage,
        setCouponValue,
        refreshCart,
        clearErrors,
        getDestinations,
        setFormLoading,
        setShippingCharge,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
