import { CURRENT_DATE } from "../actions/types";

const initialState = {
  current_date: new Date().toLocaleDateString("en-US")
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_DATE:
      return {
        ...state,
        current_date: action.payload
      };
    default:
      return state;
  }
}