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
  ERRORS,
  GET_USER,
  CLEAR_MESSAGES,
  SUCCESS_MESSAGES,
  SET_lOADING,
  SET_LOGED_IN,
  SET_FORM_lOADING,
} from "../types";


const AuthState = (props) => {

  const initialState = {
    user: null,
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
  }, [initialState.user, initialState.logedin]);



  //refresh user object
  const refreshUser = async () =>{
    await axios
        .get(`${process.env.MIX_APP_API_URL}/user`, config)
        .then((res) => {
          if (res.data) {
            dispatch({
            type: GET_USER,
            payload: res.data,
          });
          }else{
            //console.log("user not refreshed")
          }
        })
        .catch(err =>{
          //console.log("something went wrong")
        })
  }







  /** *** ACTIONS *** */
  //Register new user
  const register = async (user) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/register`, user, config)
      .then((res) => {
        refreshUser()
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
        refreshUser()
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



  //forgot password
  const sendPasswordResetLink = async (credentials) => {
    await axios
      .post(`${process.env.MIX_APP_API_URL}/password/email`, credentials, config)
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
        logedin: state.logedin,
        errors: state.errors,
        success: state.success,
        formloading: state.formloading,
        loading: state.loading,
        config,
        login,
        register,
        logout,
        updatePassword,
        resetPassword,
        setError,
        clearMessages,
        sendPasswordResetLink,
        setFormLoading,
        setLoading,
        setLogedIn,
        refreshUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
