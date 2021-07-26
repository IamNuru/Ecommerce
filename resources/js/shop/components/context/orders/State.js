import React, { useEffect } from "react";
import { useReducer } from "react";
import OrderReducer from "./Reducer";
import OrderContext from "./Context";
import axios from "axios";

//import variables from types
import {
  ERRORS,
  SET_LOGED_IN,
  SET_lOADING,
} from "../types";

const OrderState = (props) => {
  const initialState = {
    orders: [],
    errors: null,
    success: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  //set configuration for making request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };

  //get token from localstorage if found
  if (localStorage.getItem("token")) {
    initialState.logedin = true;
  } else {
    initialState.logedin = false;
  }

  

  /** *** ACTIONS *** */


  //Clear all errors on the page such as form errors
  const setError = (err) => {
    dispatch({
      type: ERRORS,
      payload: err,
    });
  };


  //get authenticated user orders
  const getOrders = async () => {
    axios
      .get(`${process.env.MIX_APP_API_URL}/orders`, config)
      .then((res) => {
        dispatch({
          type: GET_ORDERS,
          payload: res.data[0].transactions,
        });
      })
      .catch((err) => {});
  };

  //Set state loading
  const setLoading = loadingValue => {
    dispatch({
        type: SET_lOADING,
        payload: loadingValue
    });
};


  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        errors: state.errors,
        success: state.success,
        setError,
        getOrders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
