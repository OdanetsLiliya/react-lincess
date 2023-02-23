
import { call, takeLatest, put, select, all } from 'redux-saga/effects';

import { filtersApi } from './services';
import * as filterConstants from './constants';
import { filterActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';

import { getFilterArray } from '../../utils/filters';
import { CoachesType } from '../../types/coachesTypes';
import { FilterCommonType } from '../../types/filterTypes';

export function* getAllFilterData(payload: {
  type: string,
  payload: {}
}) {
  try {
    yield put(appActions.openLoader());
    const { accessToken } = yield select(authSelectors.getToken);

    const [coaches, equipment, workoutLevels, types]: [CoachesType, Array<FilterCommonType>, Array<FilterCommonType>, Array<FilterCommonType>] = yield all([
      call(filtersApi.getCoachesList, accessToken),
      call(filtersApi.getEquipmentList, accessToken),
      call(filtersApi.getWorkoutLevelsList, accessToken),
      call(filtersApi.getWorkoutTypes, accessToken),
    ])

    yield put(filterActions.getCoachesSuccess(getFilterArray(coaches.items)));
    yield put(filterActions.getEquipmentSuccess(getFilterArray(equipment)));
    yield put(filterActions.getWorkoutLevelsSuccess(getFilterArray(workoutLevels)));
    yield put(filterActions.getWorkoutTypesSuccess(getFilterArray(types)));


    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(filterConstants.GET_ALL_FILTER_DATA, getAllFilterData);
}
