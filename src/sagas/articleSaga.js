import { call, put } from 'redux-saga/effects';
import { fetchListSuccess, fetchListFailure } from "../actions/articleAction";
import api from '../api';


export default function* fetchListSaga() {
    try {
        const list = yield call(api.articleList);
        yield put(fetchListSuccess(list));
    } catch(err) {
        yield put(fetchListFailure(err));
    }
};