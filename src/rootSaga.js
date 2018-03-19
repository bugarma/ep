import { takeLatest } from "redux-saga/effects";
import {
    FETCH_LIST,
    FETCH_ARTICLE
} from "./types";
import {
    fetchListSaga,
    fetchArticleSaga
} from "./sagas/articleSaga";

export default function* rootSaga() {
    yield takeLatest(FETCH_LIST, fetchListSaga);
    yield takeLatest(FETCH_ARTICLE, fetchArticleSaga);
}