import {
  NAVBAR_TOGGLE, CLOSE_NAVBAR
} from "../types";

const SettingsReducer = (state, action) => {
  switch (action.type) {  
    case NAVBAR_TOGGLE:
      return{
        ...state,
        isNavbarOpen: !state.isNavbarOpen
      }
    case CLOSE_NAVBAR:
      return{
        ...state,
        isNavbarOpen: state.isNavbarOpen = action.payload
      }

      default:
      return {
        ...state,
      };
  }
};

export default SettingsReducer;
