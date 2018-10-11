import { ADD_EVENT , ADD_COLOR} from "./types";

export const addEvent = (events) => dispatch  => {
    localStorage.setItem("events", JSON.stringify(events))
    dispatch({
        type: ADD_EVENT,
        payload: events
    })
}

export const addColor = (colors) => dispatch  => {
    dispatch({
        type: ADD_COLOR,
        payload: colors
    })
}