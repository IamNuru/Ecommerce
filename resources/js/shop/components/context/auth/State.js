import React, { useEffect } from "react";
import { useReducer } from "react";
import AuthReducer from "./Reducer";
import AuthContext from "./Context";
import axios from "axios";

//import variables from types
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  ADD_TO_ORDERS,
  ERRORS,
  GET_ORDERS,
  GET_USER,
  CLEAR_MESSAGES,
  SUCCESS_MESSAGES,
  SET_lOADING,
  SET_LOGED_IN,
  UPDATE_USER,
  SET_FORM_lOADING,
  GET_DESTINATION,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    users: [],
    user: null,
    userDestination: null,
    orders: [],
    errors: null,
    success: null,
    logedin: false,
    loading: false,
    formloading: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

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
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      };
      await axios
        .get(`${process.env.MIX_APP_API_URL}/user`, configs)
        .then((res) => {
          if (res.data) {
            dispatch({
            type: GET_USER,
            payload: res.data,
          });
          } else {
            dispatch({
              type: SET_LOGED_IN,
              payload: false
            })
          }
          
        })
        .catch((err) => {
          dispatch({
            type: SET_LOGED_IN,
            payload: false
          })
        });
    };
    getAuthUser()
    // eslint-disable-next-line
  }, [window.location.href, initialState.user, initialState.logedin]);


  /** *** ACTIONS *** */
  //Register new user
  const register = async (user) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/register`, user, config)
      .then((res) => {
        dispatch({
          type: REGISTER,
          payload: res.data,
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };

  //log user in
  const login = async (user) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/login`, user, config)
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data[0],
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };

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

  //log user out
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //Reset user that forgot his/her password
  const resetPassword = async (credentials) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/password/reset`, credentials, config)
      .then((res) => {
        dispatch({
          type: SUCCESS_MESSAGES,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };

  //update logged in user details
  const updateUser = async (credentials) => {
    await axios
      .post(
        `${process.env.MIX_APP_API_URL}/user/update`,
        credentials,
        config
      )
      .then((res) => {
        dispatch({
          type: UPDATE_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        console.log(obj)
        dispatch({
          type: ERRORS,
          payload: obj,
          //payload: obj[Object.keys(obj)[0]],
        });
      });
  };
  //update logged in user password
  const updatePassword = async (credentials) => {
    await axios
      .post(
        `${process.env.MIX_APP_API_URL}/resetpassword`,
        credentials,
        config
      )
      .then((res) => {
        dispatch({
          type: SUCCESS_MESSAGES,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };

  //forgot password
  const sendPasswordResetLink = async (credentials) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/password/email`, credentials, config)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SUCCESS_MESSAGES,
          payload: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };

  //add to order
  const addToOrders = async (order) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/order`, order, config)
      .then((res) => {
        dispatch({
          type: ADD_TO_ORDERS,
          payload: res.data[0],
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        dispatch({
          type: ERRORS,
          payload: obj[Object.keys(obj)[0]],
        });
      });
  };
  //accept c
  const acceptC = async (id) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/initchat/${id}`, config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err.response)
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


  //get user destination
  const getUserDestination = () =>{
    axios.get(`${process.env.MIX_APP_API_URL}/user/destination`, config)
        .then(res =>{
            dispatch({
              type: GET_DESTINATION,
              payload: res.data.destination
            })
        }).catch(err =>{
            
        })
  }

  //Clear messages if any
  const clearMessages = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };

  //Clear messages if any
  const setLoading = (loadValue) => {
    dispatch({
      type: SET_lOADING,
      payload: loadValue
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
    <AuthContext.Provider
      value={{
        user: state.user,
        users: state.users,
        logedin: state.logedin,
        orders: state.orders,
        errors: state.errors,
        success: state.success,
        formloading: state.formloading,
        loading: state.loading,
        userDestination: state.userDestination,
        config,
        login,
        register,
        logout,
        updateUser,
        updatePassword,
        resetPassword,
        addToOrders,
        setError,
        getOrders,
        clearMessages,
        sendPasswordResetLink,
        setFormLoading,
        setLoading,
        setLogedIn,
        getUserDestination,
        acceptC,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
