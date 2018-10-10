import {CURRENT_DATE} from "./types";

export const currentDate = () => dispatch  => {
    dispatch({
        type: CURRENT_DATE,
        payload: new Date().toLocaleDateString("en-US")
    })
}