
import { call, takeLatest, put, select } from 'redux-saga/effects';

import { workoutsApi } from './services';
import * as coachConstants from './constants';
import { workoutActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';
import { Workout } from '../../types/workoutTypes';

export function* getWorkoutsList(payload: {
  type: string,
  payload: string
}) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);
  
    const result = yield call(workoutsApi.getWorkoutsList, payload.payload, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(workoutActions.getWorkoutsListSuccess(result.data));
    } 

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
    const accessToken = yield select(authSelectors.getAccessToken);

    const { id } = payload.payload;
  
    const result = yield call(workoutsApi.getWorkoutById, id, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(workoutActions.getDetailedWorkoutSuccess(result.data));
    } 
    
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* getWorkoutTypes(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);

    const { id } = payload.payload;
  
    const result = yield call(workoutsApi.getWorkoutTypes, id, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(workoutActions.getWorkoutTypesSuccess(result.data));
    } 
    
    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export function* getFilterData(payload: {
  type: string,
  payload: {
    id: string
  }
}) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);

    const { id } = payload.payload;
  
    const result = yield call(workoutsApi.getWorkoutTypes, id, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(workoutActions.getWorkoutTypesSuccess(result.data));
    } 

    
    
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
    const accessToken = yield select(authSelectors.getAccessToken);

    const { id, data } = payload.payload;

    console.log(payload)
  
    const result = yield call(workoutsApi.editWorkout, id, data, accessToken);

    if ([201, 200].includes(result.status)) {
      yield put(workoutActions.editWorkoutSuccess(result.data));
      yield put(appActions.setRoute('/workouts'));
    } 

    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(coachConstants.GET_WORKOUTS_LIST, getWorkoutsList);
  yield takeLatest(coachConstants.GET_WORKOUT_BY_ID, getWorkoutDetailed);
  yield takeLatest(coachConstants.GET_WORKOUT_TYPES, getWorkoutTypes);
  yield takeLatest(coachConstants.GET_FILTER_DATA, getFilterData);
  yield takeLatest(coachConstants.EDIT_WORKOUT, editWorkout);
}
