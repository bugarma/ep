import { call, put } from 'redux-saga/effects';
import {
    fetchListSuccess,
    fetchListFailure,
    fetchArticleSuccess,
    fetchArticleFailure,
} from "../actions/articleAction";
import api from '../api';

export function* fetchListSaga() {
    try {
        const list = yield call(api.articleList);
        yield put(fetchListSuccess(list));
    } catch(err) {
        yield put(fetchListFailure(err.message));
    }
};

export function* fetchArticleSaga(action) {
    try {
        const body = yield call(api.fetchArticle, action.number);
        yield put(fetchArticleSuccess(body));
    } catch (error) {
        yield put(fetchArticleFailure(error.message));
    }
}
