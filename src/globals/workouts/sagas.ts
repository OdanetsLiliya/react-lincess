
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { workoutsApi } from './services';
import * as coachConstants from './constants';
import { workoutActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';
import { Workout } from '../../types/workoutTypes';
import { CoachesType } from '../../types/coachesTypes';

export function* getWorkoutsList(payload: {
  type: string,
  payload: string
}) {
  try {
    yield put(appActions.openLoader());
    const { accessToken } = yield select(authSelectors.getToken);

    const result: {
      items: Workout[],
      count: number
    } = yield call(workoutsApi.getWorkoutsList, payload.payload, accessToken);

    yield put(workoutActions.getWorkoutsListSuccess(result));

    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* getWorkoutDetailed(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const { accessToken } = yield select(authSelectors.getToken);

    const { id } = payload.payload;

    const result: Workout = yield call(workoutsApi.getWorkoutById, id, accessToken);

    yield put(workoutActions.getDetailedWorkoutSuccess(result));

    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* editWorkout(payload: {
  type: string,
  payload: {
    id: string,
    data: Workout,
  }
}) {
  try {
    yield put(appActions.openLoader());
    const { accessToken } = yield select(authSelectors.getToken);
    const { id, data } = payload.payload;

    const result: Workout = yield call(workoutsApi.editWorkout, id, data, accessToken);

    yield put(workoutActions.editWorkoutSuccess(result));
    yield put(appActions.setRoute('/workouts'));
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(coachConstants.GET_WORKOUTS_LIST, getWorkoutsList);
  yield takeLatest(coachConstants.GET_WORKOUT_BY_ID, getWorkoutDetailed);
  yield takeLatest(coachConstants.EDIT_WORKOUT, editWorkout);
}
