import React, { useEffect } from "react";
import { useReducer } from "react";
import AdminReducer from "./Reducer";
import AdminContext from "./Context";
import axios from "axios";

//import variables from types
import {
  ERRORS,
  CLEAR_MESSAGES,
  SUCCESS_MESSAGES,
  SET_lOADING,
  SET_LOGED_IN,
} from "../types";

const AdminState = (props) => {
  const initialState = {
    users: [],
    orders: [],
    errors: null,
    success: null,
    logedin: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(AdminReducer, initialState);

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

  //get authenticated user object
  useEffect(() => {
    const getAuthUser = async () => {
      const configs = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios
        .get(`${process.env.MIX_APP_API_URL}/user`, configs)
        .then((res) => {
          dispatch({
            type: GET_USER,
            payload: res.data,
          });
        })
        .catch((err) => {});
    };
    getAuthUser();
    // eslint-disable-next-line
  }, [initialState.user, initialState.logedin]);

  /** *** ACTIONS *** */

  //set the logedin status
  const setLogedIn = (logedinValue) =>{
    dispatch({
      type: SET_LOGED_IN,
      payload: logedinValue
    });
  }

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


  return (
    <AdminContext.Provider
      value={{
        user: state.user,
        users: state.users,
        orders: state.orders,
        errors: state.errors,
        success: state.success,
        setError,
        getOrders,
        setLogedIn
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
