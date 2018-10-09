
import { CHANGE_YEAR , CHANGE_RANGE} from "./types";

export const changeYear = (year) => dispatch  => {
    dispatch({
        type: CHANGE_YEAR,
        payload: year
    })
}

export const changeRange = (range) => dispatch  => {
    dispatch({
        type: CHANGE_RANGE,
        payload: range
    })
}
