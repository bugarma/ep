import {
    START_TYPING,
    FINISH_TYPING,
    RESET_TYPING,
} from "../types";

const defaultState = {
    line: 0,
    index: 0,
    currentInput: '',
    start: false,
    stop: false
}

export default function(state=defaultState, action={}){
    switch (action.type) {
    case START_TYPING:
        return { ...state, start: true }
    case FINISH_TYPING:
        return { ...state, stop: true }
    case RESET_TYPING:
        return defaultState
    default:
        return state;
    }
}