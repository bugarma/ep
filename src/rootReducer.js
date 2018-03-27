import { combineReducers } from "redux";
import articleReducer from "./reducers/articleReducer";
import control from "./reducers/controlReducer";


export default combineReducers({
    articleReducer,
    control,
});