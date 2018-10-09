import { CHANGE_YEAR, CHANGE_RANGE } from "../actions/types";

const initialState = {
  year: new Date().getFullYear(),
  years_range: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_YEAR:
      return {
        ...state,
        year: action.payload
      };
    case CHANGE_RANGE:
      return {
        ...state,
        years_range: action.payload
      };
    default:
      return state;
  }
}
