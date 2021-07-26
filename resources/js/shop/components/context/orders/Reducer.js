import {
    ERRORS,
    CLEAR_ERRORS,
    GET_ORDERS,
    CLEAR_MESSAGES,
    SET_lOADING,
    GET_ORDER
  } from "../types";
  
  const OrderReducer = (state, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };

      case GET_ORDER:
        return {
          ...state,
          order: action.payload,
          loading: false,
        };

        case SET_lOADING:
          return {
              ...state,
              loading: action.payload
          };


        case SET_FORM_lOADING:
            return {
                ...state,
                formloading: action.payload
            };
            
        case CLEAR_MESSAGES:
            return {
                ...state,
                success: null,
                errors: null,
                loading: false
            };

        case ERRORS:
            return {
                ...state,
                errors: action.payload,
                formloading: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default OrderReducer;
  