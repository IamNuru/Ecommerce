import { useReducer } from "react";
import axios from "axios";
import ProductsReducer from "./ProductsReducer";
import ProductsContext from "./ProductsContext";

import {
    ADD_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_CATEGORY,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    GET_CATEGORIES,
    GET_ELECTRONICS,
    GET_SHOES,
    GET_CLOTHINGS,
    SEARCH_PRODUCTS,
    GET_CATEGORY_PRODUCTS,
    GET_RELATED_PRODUCTS,
    ERRORS,
    CLEAR_MESSAGES,
    CLEAR_ERRORS,
    SET_lOADING,
    SET_FORM_lOADING,
    SUBMIT_REVIEW,
    SORT_PRODUCTS,
    FILTER_PRODUCTS,
    SORT_PRICE,
    GET_ALL_PRODUCTS,
    GET_BRANDS,
    FILTER_PRODUCTS_BY_SEARCH
} from "../types";

const ProductsState = props => {
    const initialState = {
        products: null,
        allproducts: null,
        brands: null,
        product: null,
        catProducts: null,
        categories: null,
        category: null,
        shoes: null,
        clothings: null,
        electronics: null,
        relatedProducts: null,
        searchedItems: null,
        loading: true,
        formloading: false,
        errors: null,
        success: null,
        reviews: null
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

    // add category
    const addCategory = async data => {
        try {
            await axios
                .post(`${process.env.MIX_APP_API_URL}/category`, data, config)
                .then(res => {
                    dispatch({
                        type: ADD_CATEGORY,
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

    //**update category to db */
    const updateCategory = async (id, data) => {
        try {
            await axios
                .post(
                    `${process.env.MIX_APP_API_URL}/category/${id}`,
                    data,
                    config
                )
                .then(res => {
                    dispatch({
                        type: UPDATE_CATEGORY,
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

    //**delete product from db */
    const deleteProduct = async id => {
        try {
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
        } catch (error) {}
    };

    //**delete category from db */
    const deleteCategory = async id => {
        try {
            await axios
                .delete(`${process.env.MIX_APP_API_URL}/category/${id}`, config)
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

    // get all products
    const getBrands = async () => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/brands`,
                config
            );
            dispatch({
                type: GET_BRANDS,
                payload: res.data
            });
        } catch (error) {}
    };

    // get categories
    const getCategories = async () => {
        try {
            await axios
                .get(`${process.env.MIX_APP_API_URL}/categories`, config)
                .then(res => {
                    dispatch({
                        type: GET_CATEGORIES,
                        payload: res.data
                    });
                })
                .error(err => {
                    console.log(err);
                });
        } catch (error) {}
    };

    //**get specific products products */
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

    //get Jewelery
    const getShoes = async () => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/category/products/1`
            );
            dispatch({
                type: GET_SHOES,
                payload: res.data
            });
        } catch (error) {}
    };

    //get Womens' Clothing
    const getClothings = async () => {
        try {
            const res = await axios.get(
                "https://fakestoreapi.com/products/category/women's clothing"
            );
            dispatch({
                type: GET_CLOTHINGS,
                payload: res.data
            });
        } catch (error) {}
    };

    //get Electronics
    const getElectronics = async () => {
        try {
            const res = await axios.get(
                "https://fakestoreapi.com/products/category/electronics?limit=6"
            );
            dispatch({
                type: GET_ELECTRONICS,
                payload: res.data
            });
        } catch (error) {}
    };

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
                var obj = err.response.data.errors
                    ? err.response.data.errors
                    : "";
                dispatch({
                    type: ERRORS,
                    payload: obj[Object.keys(obj)[0]]
                });
            });
    };

    //update a review on a product
    const updateReview = (id, data) => {
        axios
            .post(`${process.env.MIX_APP_API_URL}/review/${id}`, data, config)
            .then(res => {
                dispatch({
                    type: SUBMIT_REVIEW,
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
    };

    /**
     *
     * @param {id} id
     */

    //update a review on a product
    const deleteReview = id => {
        axios
            .delete(`${process.env.MIX_APP_API_URL}/review/${id}`, config)
            .then(res => {
                dispatch({
                    type: SUBMIT_REVIEW,
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
    };

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
                type: FILTER_PRODUCTS_BY_SEARCH,
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

    // set category to null
    const setCategoryToNull = () => {
        dispatch({
            type: GET_CATEGORY,
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
                brands: state.brands,
                catProducts: state.catProducts,
                shoes: state.shoes,
                clothings: state.clothings,
                electronics: state.electronics,
                relatedProducts: state.relatedProducts,
                product: state.product,
                category: state.category,
                searchedItems: state.searchedItems,
                loading: state.loading,
                formloading: state.formloading,
                success: state.success,
                categories: state.categories,
                reviews: state.reviews,
                errors: state.errors,
                addProduct,
                updateProduct,
                deleteProduct,
                addCategory,
                updateCategory,
                deleteCategory,
                getProducts,
                getAllProducts,
                getBrands,
                getCategories,
                getShoes,
                getClothings,
                getElectronics,
                getProduct,
                getCategory,
                searchProducts,
                getCategoryProducts,
                getRelatedProducts,
                setProductToNull,
                setCategoryToNull,
                setSearchchedItemToNull,
                clearMessages,
                clearErrors,
                setFormLoading,
                setLoading,
                submitReview,
                deleteReview,
                updateReview,
                sortProductsBy,
                filterProductsBy
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsState;
