import { useReducer } from "react";
import SettingsReducer from "./SettingsReducer";
import SettingsContext from "./SettingsContext";

import {
  NAVBAR_TOGGLE,
  CLOSE_NAVBAR
} from "../types";

const SettingsState = (props) => {
  const initialState = {
    isNavbarOpen: false,
  };

  const [state, dispatch] = useReducer(SettingsReducer, initialState);




  const toggleNavbar = () =>{
    dispatch({
      type: NAVBAR_TOGGLE,
    })
  }
  const closeNavbar = (state) =>{
    dispatch({
      type: CLOSE_NAVBAR,
      payload: state
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        isNavbarOpen: state.isNavbarOpen,
        toggleNavbar,
        closeNavbar,

      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
