import { useReducer } from "react";
import CategoryReducer from "./Reducer";
import CategoryContext from "./Context";
import axios from "axios";

import {
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    GET_CATEGORIES,
    GET_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    CLEAR_MESSAGES,
    ADD_CATEGORY,
    GET_CATEGORY_PRODUCTS,
    SET_lOADING,
} from "../types";

const CategoryState = props => {
    const initialState = {
        categories: null,
        category: null,
        catProducts: null,
        errors: null,
        formloading: false
    };

    const [state, dispatch] = useReducer(CategoryReducer, initialState);

    //configuration
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //actions

    //get categories
    const getCategories = async () => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/categories`)
            .then(res => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: ERRORS,
                    payload: err.response.data
                });
            });
    };

    //get products based on categories
    const getCategoryProducts = async category => {
      await axios
          .get(`${process.env.MIX_APP_API_URL}/products/category/${category}`)
          .then(res => {
              dispatch({
                  type: GET_CATEGORY_PRODUCTS,
                  payload: res.data[0].products
              });
          })
          .catch(err => {
              dispatch({
                  type: ERRORS,
                  payload: "No product for this category"
              });
          });
  };

    //**delete category from db */
    const deleteCategory = async (id) => {
        try {
            await axios
                .delete(
                    `${process.env.MIX_APP_API_URL}/category/${id}`,
                    config
                )
                .then(res => {
                    dispatch({
                        type: DELETE_CATEGORY,
                        payload: res.data
                    });
                })
                .catch(err => {
                    var obj = err.response.data.errors
                        ? err.response.data.errors
                        : "";
                    dispatch({
                        type: ERRORS,
                        payload: obj[Object.keys(obj)[0]]
                    });
                });
        } catch (error) {}
    };

    //clearErrors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    //**get a category */
    const getCategory = async id => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/category/${id}`
            );
            dispatch({
                type: GET_CATEGORY,
                payload: res.data
            });
        } catch (error) {}
    };


    // add category
  const addCategory = async (data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/category`, data, config)
        .then((res) => {
          dispatch({
            type: ADD_CATEGORY,
            payload: res.data,
          });
        })
        .catch((err) => {
          var obj = err.response.data.errors ? err.response.data.errors : "";
          dispatch({
            type: ERRORS,
            payload: obj,
          });
        });
    } catch (error) {}
  };


    //**update category to db */
  const updateCategory = async (id, data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/category/${id}`, data, config)
        .then((res) => {
          dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data,
          });
        })
        .catch((err) => {
          var obj = err.response.data.errors ? err.response.data.errors : "";
          dispatch({
            type: ERRORS,
            payload: obj,
          });
        });
    } catch (error) {}
  };

    //Set state of form when clicked
    const setFormLoading = loadingValue => {
        dispatch({
            type: SET_FORM_lOADING,
            payload: loadingValue
        });
    };

    // set category to null
    const setCategoryToNull = () => {
      dispatch({
          type: GET_CATEGORY,
          payload: null
      });
  };

    //Clear messages if any
  const clearMessages = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };

  //Set state loading
    const setLoading = loadingValue => {
        dispatch({
            type: SET_lOADING,
            payload: loadingValue
        });
    };

    return (
        <CategoryContext.Provider
            value={{
                category: state.category,
                categories: state.categories,
                catProducts: state.catProducts,
                errors: state.errors,
                formloading: state.formloading,
                success: state.success,
                clearErrors,
                getCategoryProducts,
                addCategory,
                getCategories,
                setFormLoading,
                getCategory,
                deleteCategory,
                updateCategory,
                clearMessages,
                setCategoryToNull,
                setLoading,
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryState;
