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
  SET_FORM_lOADING,
  SET_SHIPPING_CHARGE,
  GET_CART_TOTALS,
  GET_CART_COUPON_WORTH,
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

    case GET_CART_TOTALS:
      return{
        ...state,
        cartTotal: state.cart.map(item => (parseInt(item.price && item.price) -  parseInt(item.deduction && item.deduction)) * parseInt(item.qty))
        .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) 
      }
    case GET_CART_COUPON_WORTH:
      return{
        ...state,
        couponWorth: state.cart
                    .map(item => (parseInt(item.price) - parseInt(item.deduction)) * parseInt(item.qty))
                    .reduce((prev, next) => parseInt(prev) + parseInt(next), 0) * (state.couponValue / 100)
        
      }

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
        errors: null,
      };


    case SET_COUPON_VALUE:
      return {
        ...state,
        couponValue: state.coupons[action.payload],
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
