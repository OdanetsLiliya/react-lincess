
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { authApi } from './services';
import * as authConstants from './constants';
import * as selectors from './selectors';
import { authActions } from './actions';

import { appActions } from '../app/actions';

import {
  TokensType,
  UserSignUpResponseType,
  UserSignUpType,
  UserType,
} from '../../types/authTypes';
import { InferActionsTypes } from '../../stores';

export function* logIn(payload: {
  type: string,
  payload: UserSignUpType
}) {
  try {
    yield put(appActions.openLoader());
    const user: UserSignUpType = payload.payload;

    const result: { user: UserSignUpResponseType, tokens: TokensType } = yield call(
      authApi.logIn,
      { user }
    );

    yield put(authActions.logInSignUpSuccess(result));
    yield put(appActions.setRoute('/workouts'));
    yield put(appActions.closeLoader());
  } catch (e: any) {
    yield put(appActions.setMessage({
      message: e.response.data.message,
      isShowMessage: true
    }));
    yield put(appActions.closeLoader());
  }
}
export function* signUp(payload: {
  type: string,
  payload: UserSignUpType
}) {
  try {
    yield put(appActions.openLoader());
    const user: UserSignUpType = payload.payload;

    const result: { user: UserSignUpResponseType, tokens: TokensType } = yield call(
      authApi.signUp,
      { user }
    );

    yield put(authActions.logInSignUpSuccess(result));
    yield put(appActions.setRoute('/workouts'));


    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* logout(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const { id } = payload.payload;
    const { accessToken } = yield select(selectors.getToken);

    yield call(authApi.logout, id, accessToken);

    yield put(authActions.logoutSuccess());
    yield put(appActions.setRoute('/login'));
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(authActions.logoutSuccess());
    yield put(appActions.setRoute('/login'));
    yield put(appActions.closeLoader());
  }
}

export function* getProfile(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const { id } = payload.payload;
    const { accessToken } = yield select(selectors.getToken);
    const result: UserSignUpResponseType = yield call(authApi.getUserByID, id, accessToken);

    yield put(authActions.getProfileSuccess(result));
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* refreshToken(payload: {
  type: string;
  payload: {
    action: InferActionsTypes<any>
  }
}) {
  try {
    yield put(appActions.openLoader());
    yield put(appActions.setRefreshing(true));
    const { action } = payload.payload;

    const { refreshToken } = yield select(selectors.getToken);
    const user: UserType = yield select(selectors.getUser);
    const result: TokensType = yield call(authApi.refreshToken, user.id, refreshToken);

    yield put(authActions.refreshTokenSuccess(result));
    yield put(action)
    yield put(appActions.closeLoader());
    yield put(appActions.setRefreshing(false));
  } catch (e) {
    yield put(authActions.logoutSuccess());
    yield put(appActions.setRoute('/login'));
    yield put(appActions.closeLoader());
    yield put(appActions.setRefreshing(false));
  }
}

export default function* WatcherSaga() {
  yield takeLatest(authConstants.LOG_IN, logIn);
  yield takeLatest(authConstants.SIGN_UP, signUp);
  yield takeLatest(authConstants.LOG_OUT, logout);
  yield takeLatest(authConstants.GET_PROFILE, getProfile);
  yield takeLatest(authConstants.REFRESH_TOKEN, refreshToken);
}
