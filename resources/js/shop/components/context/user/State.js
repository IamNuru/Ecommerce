import React, { useEffect } from "react";
import { useReducer } from "react";
import UserReducer from "./Reducer";
import UserContext from "./Context";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//import variables from types
import {
  ADD_TO_ORDERS,
  ERRORS,
  GET_USER,
  CLEAR_MESSAGES,
  SET_lOADING,
  SET_LOGED_IN,
  UPDATE_USER,
  SET_FORM_lOADING,
  CLEAR_ERRORS,
} from "../types";

const UserState = (props) => {
  const MySwal = withReactContent(Swal);
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
});
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

  const [state, dispatch] = useReducer(UserReducer, initialState);

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
  }, [ initialState.user, initialState.success]);


  /** *** ACTIONS *** */  


  //Clear all errors on the page such as form errors
  const setError = (err) => {
    dispatch({
      type: ERRORS,
      payload: err,
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
        refreshUser()
        setFormLoading(false)
        clearErrors()
        Toast.fire({
          icon: "success",
          title: res.data
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

  //update logged in user address
  const updateUserAddress = async (credentials) => {
    await axios
      .post(
        `${process.env.MIX_APP_API_URL}/user/update/address`,
        credentials,
        config
      )
      .then((res) => {
          refreshUser()
          setFormLoading(false)
          clearErrors()
          Toast.fire({
            icon: "success",
            title: res.data
        });
      })
      .catch((err) => {
        var obj = err.response.data.errors ? err.response.data.errors : "";
        console.log(obj)
        dispatch({
          type: ERRORS,
          payload: obj,
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


  //Clear messages if any
  const clearMessages = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };


  //Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
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
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        logedin: state.logedin,
        errors: state.errors,
        success: state.success,
        formloading: state.formloading,
        loading: state.loading,
        config,
        updateUser,
        updateUserAddress,
        addToOrders,
        setError,
        clearMessages,
        setFormLoading,
        setLoading,
        refreshUser,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
