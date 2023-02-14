
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { coachesApi } from './services';
import * as coachConstants from './constants';
import { coachesActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';

export function* getCoachesList({ payload } : any) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);
  
    const result = yield call(coachesApi.getCoachesList, payload, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(coachesActions.getCoachesListSuccess(result.data));
    } 

    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* getCoach(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);

    const { id } = payload.payload;
  
    const result = yield call(coachesApi.getCoach, id, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(coachesActions.getCoachDetailedSuccess(result.data));
    } 
    
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(coachConstants.GET_COACHES_LIST, getCoachesList);
  yield takeLatest(coachConstants.GET_DETAILED_COACH, getCoach);
}
