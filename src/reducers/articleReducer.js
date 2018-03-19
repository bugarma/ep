import {
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    FETCH_ARTICLE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
} from "../types";

const defaultState = {
    loaded: true,
    list: [],
    number: "",
    body: []
}

export default function(state = defaultState, action = {}) {
    switch (action.type) {
    case FETCH_LIST:
        return { ...state, loaded: false };
    case FETCH_LIST_SUCCESS:
        return { ...state, loaded:true, list: action.list };
    case FETCH_ARTICLE:
        return { ...state, loaded: false, number: action.number };
    case FETCH_ARTICLE_SUCCESS:
        return { ...state, loaded: true, body: action.body };
    case FETCH_ARTICLE_FAILURE:
    case FETCH_LIST_FAILURE:
        return { ...state, loaded: true, error: action.error };
    default:
        return state;
    }
}