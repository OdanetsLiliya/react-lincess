
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { coachesApi } from './services';
import * as coachConstants from './constants';
import { coachesActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';
import { CoachesType, CoachType } from '../../types/coachesTypes';

export function* getCoachesList(payload: {
  type: string,
  payload: {}
}) {
  try {
    yield put(appActions.openLoader());
    const { accessToken } = yield select(authSelectors.getToken);

    const result: CoachesType = yield call(coachesApi.getCoachesList, '', accessToken);

    yield put(coachesActions.getCoachesListSuccess(result));
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
    const { accessToken } = yield select(authSelectors.getToken);

    const { id } = payload.payload;

    const result: CoachType = yield call(coachesApi.getCoach, id, accessToken);

    yield put(coachesActions.getCoachDetailedSuccess(result));
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(coachConstants.GET_COACHES_LIST, getCoachesList);
  yield takeLatest(coachConstants.GET_DETAILED_COACH, getCoach);
}
