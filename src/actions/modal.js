import { ADD_EVENT, ADD_COLOR, REMOVE_EVENT } from "./types";

export const addEvent = events => dispatch => {
  localStorage.setItem("events", JSON.stringify(events));
  dispatch({
    type: ADD_EVENT,
    payload: events
  });
};

export const addColor = colors => dispatch => {
  localStorage.setItem("colors", JSON.stringify(colors));
  dispatch({
    type: ADD_COLOR,
    payload: colors
  });
};

export const removeEvent = events => dispatch => {
  localStorage.setItem("events", JSON.stringify(events));
  dispatch({
    type: REMOVE_EVENT,
    payload: events
  });
};
