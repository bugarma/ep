import { FETCH_LIST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from "../types";

export default function(state = { loaded: true, list: [] }, action = {}) {
    switch (action.type) {
    case FETCH_LIST:
        return { ...state, loaded: false };
    case FETCH_LIST_SUCCESS:
        return { ...state, loaded:true, list: action.list };
    case FETCH_LIST_FAILURE:
        return { ...state, loaded: true, error: action.error };
    default:
        return state;
    }
}