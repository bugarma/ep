import { FETCH_LIST, FETCH_LIST_SUCCESS, FETCH_LIST_FAILURE } from "../types";

export const fetchList = () => ({
    type: FETCH_LIST
});

export const fetchListSuccess = (list) => ({
    type: FETCH_LIST_SUCCESS,
    list
});

export const fetchListFailure = (error) => ({
    type: FETCH_LIST_FAILURE,
    error
});


