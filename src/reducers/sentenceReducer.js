import { FETCH_ARTICLE, FETCH_ARTICLE_FAILURE, FETCH_ARTICLE_SUCCESS } from "../types";

const defaultState = {
    line: 0,
    index: 0,
    currentInput: '',
    body: [],
    finished: [],
    number: null,
    loaded: true,
};

export default function (state = defaultState, action={}) {
    switch (action.type) {
    case FETCH_ARTICLE:
        return {...state, loaded: false, number: action.number}
    case FETCH_ARTICLE_SUCCESS: {
        const { body } = action;
        return {
            ...defaultState,
            body,
            finished: Array(body.length).fill(false),
            number: state.number
        }
    }
    case FETCH_ARTICLE_FAILURE:
        return {
            ...state,
            error: action.error
        }
    default:
        return state;
    }
}