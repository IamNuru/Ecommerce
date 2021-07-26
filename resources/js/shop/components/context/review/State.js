import React, { useEffect } from "react";
import { useReducer } from "react";
import ReviewReducer from "./Reducer";
import ReviewContext from "./Context";
import axios from "axios";

//import variables from types
import {
  ERRORS,
  CLEAR_MESSAGES,
  SET_FORM_lOADING,
} from "../types";

const ReviewState = (props) => {
  const initialState = {
    reviews:null,
    errors: null,
    success: null,
    logedin: false,
    loading: false,
    formloading:false,
  };

  const [state, dispatch] = useReducer(ReviewReducer, initialState);

  //set configuration for making request
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  };


  //subit a review on a product
  const submitReview = (id, data) => {
    axios
        .post(
            `${process.env.MIX_APP_API_URL}/review/product/${id}`,
            data,
            config
        )
        .then(res => {
            dispatch({
                type: SUBMIT_REVIEW,
                payload: res.data
            });
        })
        .catch(err => {
            var obj = err.response.errors
                ? err.response.errors
                : "";
            dispatch({
                type: ERRORS,
                payload: obj[Object.keys(obj)[0]]
            });
        });
};
  //subit a review on a product
  const updateReview = (id, data) => {
    axios
        .post(
            `${process.env.MIX_APP_API_URL}/review/${id}`,
            data,
            config
        )
        .then(res => {
            dispatch({
                type: UPDATE_REVIEW,
                payload: res.data
            });
        })
        .catch(err => {
          var obj = err.response?.errors
          ? err.response.errors
          : "";
            dispatch({
                type: ERRORS,
                payload: obj[Object.keys(obj)[0]]
            });
        });
};


//update a review on a product
const deleteReview = id => {
  axios
      .delete(`${process.env.MIX_APP_API_URL}/review/${id}`, config)
      .then(res => {
          dispatch({
              type: DELETE_REVIEW,
              payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response
          });
      });
};

  /** *** ACTIONS *** */


  //Clear all errors on the page such as form errors
  const setError = (err) => {
    dispatch({
      type: ERRORS,
      payload: err,
    });
  };


  //get authenticated user orders
  const getReviews = async () => {
    axios
      .get(`${process.env.MIX_APP_API_URL}/reviews`, config)
      .then((res) => {
        dispatch({
          type: GET_ORDERS,
          payload: res.data
        });
      })
      .catch((err) => {});
  };


  //get a review
  const getReview = async id => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/review/${id}`
            );
            dispatch({
                type: GET_REVIEW,
                payload: res.data
            });
        } catch (error) {
          dispatch({
            type: ERRORS,
            payload: res.data
        });
        }
    };

    //Set state of form when clicked
    const setFormLoading = loadingValue => {
      dispatch({
          type: SET_FORM_lOADING,
          payload: loadingValue
      });
  };

    //clear messages if any
    const clearMessages = () => {
      dispatch({
          type: CLEAR_MESSAGES
      });
  };


  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        errors: state.errors,
        success: state.success,
        setError,
        submitReview,
        updateReview,
        getReviews,
        getReview,
        deleteReview,
        clearMessages,
        setFormLoading,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
