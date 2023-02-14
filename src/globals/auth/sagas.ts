
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { authApi } from './services';
import * as authConstants from './constants';
import * as selectors from './selectors';
import { authActions } from './actions';

import { appActions } from '../app/actions';

import {
  UserSignUpType,
} from '../../types/authTypes';

export function* logIn(payload: {
  type: string,
  payload: UserSignUpType
}) {
  try {
    yield put(appActions.openLoader());
    const user : UserSignUpType  = payload.payload;

    const result  = yield call(
      authApi.logIn,
      { user }
    );

    if ([201, 200].includes(result.status)) {
      yield put(authActions.logInSignUpSuccess(result.data));
      yield put(appActions.setRoute('/coaches-list'));
    } else {
      yield put(appActions.setMessage({
        message: result.data.message,
        isShowMessage: true
      }));
    }
    yield put(appActions.closeLoader());
  } catch (e) {
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
    const user : UserSignUpType  = payload.payload;

    const result = yield call(
      authApi.signUp,
      { user }
    );

    if ([201, 200].includes(result.status)) {
      yield put(authActions.logInSignUpSuccess(result.data));
      yield put(appActions.setRoute('/coaches-list'));
    } else {
      
    }

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
    const accessToken = yield select(selectors.getAccessToken);
    const result = yield call(authApi.logout, id, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(authActions.logoutSuccess());
      yield put(appActions.setRoute('/login'));
    }
    yield put(appActions.closeLoader());
  } catch (e) {
    console.log(e)
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
    const accessToken = yield select(selectors.getAccessToken);
    const result = yield call(authApi.getUserByID, id, accessToken);
    console.log(result);
    if (result.status === "error") {
      yield put(authActions.logoutSuccess());
      yield put(appActions.setRoute('/login'));
    } else {
      yield put(authActions.getProfileSuccess(result.data));
      yield put(appActions.setRoute('/login'));
    }
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* refreshToken(payload: {
    type: string;
    payload: {
      action: any
    }
}) {
  try {
    yield put(appActions.openLoader());
    yield put(appActions.setRefreshing(true));
    const { action } = payload.payload;

    const refreshToken = yield select(selectors.getRefreshToken);
    const user = yield select(selectors.getUser);
    const result = yield call(authApi.refreshToken, user.id, refreshToken);

    if ([201, 200].includes(result.status)) {
      yield put(authActions.refreshTokenSuccess(result.data));
      yield put(action)
    } else {
      yield put(authActions.logoutSuccess());
      yield put(appActions.setRoute('/login'));
    }
    yield put(appActions.closeLoader());
    yield put(appActions.setRefreshing(false));
  } catch (e) {
    console.log(e)
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
