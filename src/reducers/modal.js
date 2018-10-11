import { CHANGE_YEAR, CHANGE_RANGE, ADD_COLOR, ADD_EVENT } from "../actions/types";

const initialState = {
    events: JSON.parse(localStorage.getItem("events")) || [],
    colors: JSON.parse(localStorage.getItem("colors")) || []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: action.payload
      };
    case ADD_COLOR:
      return {
        ...state,
        colors: action.payload
      };
    default:
      return state;
  }
}