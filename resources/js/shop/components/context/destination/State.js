import { useReducer } from "react";
import DestinationReducer from "./Reducer";
import DestinationContext from "./Context";
import axios from "axios";

import {
    ERRORS,
    CLEAR_ERRORS,
    SET_FORM_lOADING,
    GET_DESTINATIONS,
    GET_DESTINATION,
    DELETE_DESTINATION,
    UPDATE_DESTINATION,
    CLEAR_MESSAGES,
    ADD_DESTINATION
} from "../types";

const DestinationState = props => {
    const initialState = {
        destinations: null,
        destination: null,
        errors: null,
        formloading: false
    };

    const [state, dispatch] = useReducer(DestinationReducer, initialState);

    //configuration
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    };

    //actions

    //get destinations
    const getDestinations = async () => {
        await axios
            .get(`${process.env.MIX_APP_API_URL}/destinations`)
            .then(res => {
                dispatch({
                    type: GET_DESTINATIONS,
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

    //**delete destination from db */
    const deleteDestination = async (id) => {
        try {
            await axios
                .delete(
                    `${process.env.MIX_APP_API_URL}/destination/${id}`,
                    config
                )
                .then(res => {
                    dispatch({
                        type: DELETE_DESTINATION,
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

    //**get a destination */
    const getDestination = async id => {
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_API_URL}/destination/${id}`
            );
            dispatch({
                type: GET_DESTINATION,
                payload: res.data
            });
        } catch (error) {}
    };


    // add destination
  const addDestination = async (data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/destination`, data, config)
        .then((res) => {
          dispatch({
            type: ADD_DESTINATION,
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

    //**update destination to db */
  const updateDestination = async (id, data) => {
    try {
      await axios
        .post(`${process.env.MIX_APP_API_URL}/destination/${id}`, data, config)
        .then((res) => {
          dispatch({
            type: UPDATE_DESTINATION,
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

    //Clear messages if any
  const clearMessages = () => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };

    return (
        <DestinationContext.Provider
            value={{
                destination: state.destination,
                destinations: state.destinations,
                errors: state.errors,
                formloading: state.formloading,
                success: state.success,
                clearErrors,
                addDestination,
                getDestinations,
                setFormLoading,
                getDestination,
                deleteDestination,
                updateDestination,
                clearMessages,
            }}
        >
            {props.children}
        </DestinationContext.Provider>
    );
};

export default DestinationState;
