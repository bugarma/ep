import { 
    FETCH_LIST,
    FETCH_LIST_SUCCESS,
    FETCH_LIST_FAILURE,
    FETCH_ARTICLE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    LINE_FINISHED,
} from "../types";

export const fetchList = (url) => ({
    type: FETCH_LIST,
    url
});

export const fetchListSuccess = (list) => ({
    type: FETCH_LIST_SUCCESS,
    list,
});

export const fetchListFailure = (error) => ({
    type: FETCH_LIST_FAILURE,
    error
});

export const fetchArticle = (number) => ({
    type: FETCH_ARTICLE,
    number
})

export const fetchArticleSuccess = (body) => ({
    type: FETCH_ARTICLE_SUCCESS,
    body
})

export const fetchArticleFailure = (error) => ({
    type: FETCH_ARTICLE_FAILURE,
    error
})

export const lineFinished = (line) => ({
    type: LINE_FINISHED,
    line
})
