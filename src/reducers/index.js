import { combineReducers } from "redux";
import header from "./header";
import calendar from "./calendar";
import modal from "./modal";

export default combineReducers({
    header: header,
    calendar: calendar,
    modal: modal
});
