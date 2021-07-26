import React from "react";
import { useReducer } from "react";
import AdminReducer from "./Reducer";
import AdminContext from "./Context";

//import variables from types
import {
    ERRORS,
    FILTER_BY_SEARCH,
    GET_CUSTOMER,
    GET_CUSTOMERS,
    GET_DAILY_SALES,
    GET_MONTHLY_SALES,
    GET_SALES,
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    GET_WEEKLY_SALES,
    SET_CUSTOMER_TO_NULL,
    SET_FILTERED_TO_NULL,
    SET_FORM_lOADING,
    SET_lOADING,
    SET_SINGLE_TO_NULL
} from "../types";

const AdminState = props => {
    const initialState = {
        errors: null,
        success: null,
        loading: false,
        customers: null,
        transactions: null,
        filtered: null,
        customer: null,
        sales: null,
        dailySales: null,
        weeklySales: null,
        monthlySales: null,
        transaction: null,
        formLoading: false
    };

    const [state, dispatch] = useReducer(AdminReducer, initialState);

    //set configuration for making request
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    /** *** ACTIONS *** */

    //get customers
    const getCustomers = async limit => {
        if (limit) {
            await axios
                .get(
                    `${process.env.MIX_APP_API_URL}/customers?limit=${limit}`,
                    config
                )
                .then(res => {
                    dispatch({
                        type: GET_CUSTOMERS,
                        payload: res.data
                    });
                })
                .catch(err => {
                    dispatch({
                        type: ERRORS,
                        payload: err.response
                    });
                });
        } else {
            await axios
                .get(`${process.env.MIX_APP_API_URL}/customers`, config)
                .then(res => {
                    dispatch({
                        type: GET_CUSTOMERS,
                        payload: res.data
                    });
                })
                .catch(err => {
                    dispatch({
                        type: ERRORS,
                        payload: err.respons
                    });
                });
        }
    };

    //get a customer stuffs
    const getCustomer = async id => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/customer/${id}`, config)
            .then(res => {
                dispatch({
                    type: GET_CUSTOMER,
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

    //get sales
    const getSales = async dur => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/sales?duration=${dur}`, config)
            .then(res => {
                if (dur === "all") {
                    dispatch({
                        type: GET_SALES,
                        payload: res.data
                    });
                } else if (dur === "daily") {
                    dispatch({
                        type: GET_DAILY_SALES,
                        payload: res.data
                    });
                } else if (dur === "weekly") {
                    dispatch({
                        type: GET_WEEKLY_SALES,
                        payload: res.data
                    });
                } else if (dur === "monthly") {
                    dispatch({
                        type: GET_MONTHLY_SALES,
                        payload: res.data
                    });
                } else
                    dispatch({
                        type: GET_SALES,
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

    //get sales by date range
    const getSalesByDateRange = async (from, to) => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/sales/daterange?from=${from}&&to=${to}`, config)
            .then(res => {
                dispatch({
                    type: GET_SALES,
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

    //get all transactions
    const getTransactions = async () => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/transactions`, config)
            .then(res => {
                dispatch({
                    type: GET_TRANSACTIONS,
                    payload: res.data
                });
            })
            .catch(err => {});
    };

    //get a particular transaction
    const getTransaction = async id => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/transaction/${id}`, config)
            .then(res => {
                if (
                    res.data &&
                    Object.keys(res.data).length === 0 &&
                    res.data.constructor === Object
                ) {
                    dispatch({
                        type: SET_lOADING,
                        payload: false
                    });
                } else {
                    dispatch({
                        type: GET_TRANSACTION,
                        payload: res.data
                    });
                }
            })
            .catch(err => {
                console.log(err.response);
                dispatch({
                    type: ERRORS,
                    payload: err.response
                });
            });
    };

    const updateTransactionStatus = async (id, data) => {
        await axios
            .post(
                `${process.env.MIX_APP_API_URL}/updateTransactionStatus/${id}`,
                data,
                config
            )
            .then(res => {
                dispatch({
                    type: SET_FORM_lOADING,
                    payload: false
                });
            })
            .catch(err => {
                dispatch({
                    type: ERRORS,
                    payload: err.response
                });
            });
    };

    const getFilteredTransactions = text => {
        dispatch({
            type: FILTER_BY_SEARCH,
            payload: text
        });
    };

    //set state of loading
    const setLoading = load => {
        dispatch({
            type: SET_lOADING,
            payload: load
        });
    };

    //set transaction to null
    const setTransactionToNull = () => {
        dispatch({
            type: SET_SINGLE_TO_NULL
        });
    };

    //set transaction to null
    const setCustomerToNull = () => {
        dispatch({
            type: SET_CUSTOMER_TO_NULL
        });
    };

    const setFilteredToNull = () => {
        dispatch({
            type: SET_FILTERED_TO_NULL
        });
    };

    //set transaction to null
    const setFormLoading = () => {
        dispatch({
            type: SET_FORM_lOADING,
            payload: true
        });
    };

    //Clear all errors on the page such as form errors
    const setError = err => {
        dispatch({
            type: ERRORS,
            payload: err
        });
    };

    return (
        <AdminContext.Provider
            value={{
                customers: state.customers,
                customer: state.customer,
                sales: state.sales,
                weeklySales: state.weeklySales,
                monthlySales: state.monthlySales,
                dailySales: state.dailySales,
                transactions: state.transactions,
                filtered: state.filtered,
                transaction: state.transaction,
                errors: state.errors,
                success: state.success,
                loading: state.loading,
                formLoading: state.formLoading,
                getTransactions,
                getTransaction,
                getFilteredTransactions,
                updateTransactionStatus,
                getCustomers,
                getCustomer,
                setTransactionToNull,
                setFilteredToNull,
                setFormLoading,
                setCustomerToNull,
                getSales,
                setError,
                setLoading,
                getSalesByDateRange,
            }}
        >
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminState;
