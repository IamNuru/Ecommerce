import {
    REGISTER,
    LOGIN,
    LOGOUT,
    ADD_TO_ORDERS,
    ERRORS,
    CLEAR_ERRORS,
    GET_ORDERS,
    GET_USER,
    CLEAR_MESSAGES,
    SUCCESS_MESSAGES,
    SET_lOADING,
    SET_LOGED_IN,
  } from "../types";
  
  const AdminReducer = (state, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
  
      default:
        return {
          ...state,
        };
    }
  };
  
  export default AdminReducer;
  