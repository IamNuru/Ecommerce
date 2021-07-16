import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_CART_ITEM_QTY,
  DECREASE_CART_ITEM_QTY,
  CLEAR_CART,
  SET_COUPON_VALUE,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_CART_ITEMS,
  ERRORS,
  CLEAR_ERRORS,
  GET_DESTINATIONS,
  SET_FORM_lOADING,
  SET_SHIPPING_CHARGE,
} from "../types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        peep: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishList: state.wishList.filter((item) => item.id !== action.payload),
      };

    case INCREASE_CART_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
        ),
      };

    case DECREASE_CART_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        errors: null,
      };


    case GET_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
        errors: null,
      };

    case SET_COUPON_VALUE:
      return {
        ...state,
        couponValue: state.coupons[action.payload],
      };


    case SET_SHIPPING_CHARGE:
      return {
        ...state,
        shippingCharge: action.payload,
      };

    case SET_FORM_lOADING:
      return {
          ...state,
          formloading: action.payload
      };

    case ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default CartReducer;
