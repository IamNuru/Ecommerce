import { useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./Reducer";
import ProductsContext from "./Context";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    SEARCH_PRODUCTS,
    GET_RELATED_PRODUCTS,
    ERRORS,
    CLEAR_MESSAGES,
    CLEAR_ERRORS,
    SET_lOADING,
    SET_FORM_lOADING,
    SORT_PRODUCTS,
    FILTER_PRODUCTS,
    SORT_PRICE,
    GET_ALL_PRODUCTS,
    FILTER_BY_SEARCH
} from "../types";

const ProductsState = props => {
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
        products: null,
        allproducts: null,
        product: null,
        relatedProducts: null,
        searchedItems: null,
        loading: true,
        formloading: false,
        errors: null,
        success: null
    };

    //initialise the state
    const [state, dispatch] = useReducer(ProductsReducer, initialState);

    //configuration
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //set the actions
    //**add product to db */
    const addProduct = async data => {
        try {
            await axios
                .post(`${process.env.MIX_APP_API_URL}/product`, data, config)
                .then(res => {
                    dispatch({
                        type: ADD_PRODUCT,
                        payload: res.data
                    });
                })
                .catch(err => {
                    var obj = err.response.data.errors
                        ? err.response.data.errors
                        : "";
                    dispatch({
                        type: ERRORS,
                        /* payload: obj[Object.keys(obj)[0]], */
                        payload: obj
                    });
                });
        } catch (error) {}
    };

    //**update product to db */
    const updateProduct = async (id, data) => {
        try {
            await axios
                .post(
                    `${process.env.MIX_APP_API_URL}/product/${id}`,
                    data,
                    config
                )
                .then(res => {
                    dispatch({
                        type: UPDATE_PRODUCT,
                        payload: res.data
                    });
                })
                .catch(err => {
                    var obj = err.response.data.errors
                        ? err.response.data.errors
                        : "";
                    dispatch({
                        type: ERRORS,
                        payload: obj
                    });
                });
        } catch (error) {}
    };

    //**delete product from db */
    const deleteProduct = id => {
        MySwal.fire({
            text: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: `Save Changes`
        }).then(async result => {
            if (result.isConfirmed) {
                await axios
                    .delete( `${process.env.MIX_APP_API_URL}/product/${id}`, config)
                    .then(res => {
                        Toast.fire({
                            icon: "success",
                            title: "Product Deleted Saved succesfully"
                        });
                    })
                    .catch(err => {
                        MySwal.fire({
                            text: "Something went wrong. Try again",
                            icon: "info"
                            
                        }
                        );
                    });
            }
        });
        /*  try {
            await axios
                .delete(`${process.env.MIX_APP_API_URL}/product/${id}`, config)
                .then(res => {
                    dispatch({
                        type: DELETE_PRODUCT
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
        } catch (error) {} */
    };

    // get products
    const getProducts = async () => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/products`,
                config
            );
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            });
        } catch (error) {}
    };

    // get all products
    const getAllProducts = async () => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/products`,
                config
            );
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: res.data
            });
        } catch (error) {}
    };


    //**get specific products products */

    //get related products
    const getRelatedProducts = async productId => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/related/products/${productId}?limit=6`,
                config
            );

            dispatch({
                type: GET_RELATED_PRODUCTS,
                payload: res.data
            });
        } catch (error) {}
    };

    /**
     *
     * @param {id} id
     * @param {data} data
     */

    /**
     *
     * @param {id} id
     */

    //**get a product */
    const getProduct = async id => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/product/${id}`
            );
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: SET_lOADING,
                payload: false
            });
        }
    };

    // search product
    const searchProducts = async text => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/search?text=${text}`)
            .then(res => {
                dispatch({
                    type: SEARCH_PRODUCTS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: ERRORS,
                    payload: "Your search returns 0 results"
                });
            });
    };

    //sort the products
    const sortProductsBy = (sort, direction) => {
        if (sort == "price") {
            dispatch({
                type: SORT_PRICE,
                payload: direction
            });
        }
    };

    //filter the products
    const filterProductsBy = (t, filter) => {
        if (t == "brands") {
            dispatch({
                type: FILTER_PRODUCTS,
                payload: filter
            });
        } else if (t == "search_input") {
            dispatch({
                type: FILTER_BY_SEARCH,
                payload: filter
            });
        }
    };

    // set product to null
    const setProductToNull = () => {
        dispatch({
            type: GET_PRODUCT,
            payload: null
        });
    };

    // set searched item container to null
    const setSearchchedItemToNull = () => {
        dispatch({
            type: SEARCH_PRODUCTS,
            payload: null
        });
    };

    //clear messages if any
    const clearMessages = () => {
        dispatch({
            type: CLEAR_MESSAGES
        });
    };

    //Clear messages if any
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    //Set state loading
    const setLoading = loadingValue => {
        dispatch({
            type: SET_lOADING,
            payload: loadingValue
        });
    };

    //Set state of form when clicked
    const setFormLoading = loadingValue => {
        dispatch({
            type: SET_FORM_lOADING,
            payload: loadingValue
        });
    };

    return (
        <ProductsContext.Provider
            value={{
                products: state.products,
                allproducts: state.allproducts,
                catProducts: state.catProducts,
                relatedProducts: state.relatedProducts,
                product: state.product,
                searchedItems: state.searchedItems,
                loading: state.loading,
                formloading: state.formloading,
                success: state.success,
                errors: state.errors,
                addProduct,
                updateProduct,
                deleteProduct,
                getProducts,
                getAllProducts,
                getProduct,
                searchProducts,
                getRelatedProducts,
                setProductToNull,
                setSearchchedItemToNull,
                clearMessages,
                clearErrors,
                setFormLoading,
                setLoading,
                sortProductsBy,
                filterProductsBy
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsState;
