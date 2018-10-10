import {CURRENT_DATE} from "./types";

export const currentDate = () => dispatch  => {
    const date = new Date().toLocaleDateString("en-US");
    dispatch({
        type: CURRENT_DATE,
        payload: date
    })
}