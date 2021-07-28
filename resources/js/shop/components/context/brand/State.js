import { useReducer } from "react";
import BrandReducer from "./Reducer";
import BrandContext from "./Context";

import {
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    GET_BRANDS,
    GET_BRAND,
    DELETE_BRAND,
    UPDATE_BRAND,
    CLEAR_MESSAGES,
    ADD_BRAND,
    GET_BRAND_PRODUCTS,
    SET_lOADING,
} from "../types";

const BrandState = props => {
    const initialState = {
        brands: null,
        brand: null,
        brandProducts: null,
        errors: null,
        formloading: false
    };

    const [state, dispatch] = useReducer(BrandReducer, initialState);

    //configuration
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //actions

    //get brands
    const getBrands = async () => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/brands`)
            .then(res => {
                dispatch({
                    type: GET_BRANDS,
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

    //get products based on brands
    const getBrandProducts = async brand => {
      await axios
          .get(`${process.env.MIX_APP_API_URL}/products/brand/${brand}`)
          .then(res => {
              dispatch({
                  type: GET_BRAND_PRODUCTS,
                  payload: res.data[0].products
              });
          })
          .catch(err => {
              dispatch({
                  type: ERRORS,
                  payload: "No product for this brand"
              });
          });
  };

    //**delete brand from db */
    const deleteBrand = async (id) => {
        try {
            await axios
                .delete(
                    `${process.env.MIX_APP_API_URL}/brand/${id}`,
                    config
                )
                .then(res => {
                    dispatch({
                        type: DELETE_BRAND,
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

    //**get a brand */
    const getBrand = async id => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/brand/${id}`
            );
            dispatch({
                type: GET_BRAND,
                payload: res.data
            });
        } catch (error) {}
    };


    // add brand
  const addBrand = async (data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/brand`, data, config)
        .then((res) => {
          dispatch({
            type: ADD_BRAND,
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


    //**update brand to db */
  const updateBrand = async (id, data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/brand/${id}`, data, config)
        .then((res) => {
          dispatch({
            type: UPDATE_BRAND,
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

    // set brand to null
    const setBrandToNull = () => {
      dispatch({
          type: GET_BRAND,
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
        <BrandContext.Provider
            value={{
                brand: state.brand,
                brands: state.brands,
                brandProducts: state.brandProducts,
                errors: state.errors,
                formloading: state.formloading,
                success: state.success,
                clearErrors,
                getBrandProducts,
                addBrand,
                getBrands,
                setFormLoading,
                getBrand,
                deleteBrand,
                updateBrand,
                clearMessages,
                setBrandToNull,
                setLoading,
            }}
        >
            {props.children}
        </BrandContext.Provider>
    );
};

export default BrandState;
