import { takeLatest } from "redux-saga/effects";
import { FETCH_LIST } from "./types";
import fetchListSaga from "./sagas/articleSaga";

export default function* rootSaga() {
    yield takeLatest(FETCH_LIST, fetchListSaga);
}