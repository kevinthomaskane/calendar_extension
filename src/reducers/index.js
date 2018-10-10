import { combineReducers } from "redux";
import header from "./header";
import calendar from "./calendar";

export default combineReducers({
    header: header,
    calendar: calendar
});
