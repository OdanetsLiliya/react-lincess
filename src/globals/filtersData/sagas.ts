
import { call, takeLatest, put, select, all } from 'redux-saga/effects';

import { filtersApi } from './services';
import * as filterConstants from './constants';
import { filterActions } from './actions';

import { appActions } from '../app/actions';

import * as authSelectors from '../auth/selectors';

import { getFilterArray } from '../../utils/filters';

export function* getAllFilterData({ payload } : any) {
  try {
    yield put(appActions.openLoader());
    const accessToken = yield select(authSelectors.getAccessToken);
  
    const [coaches, equipment, workoutLevels, types] = yield all([
      call(filtersApi.getCoachesList, accessToken),
      call(filtersApi.getEquipmentList, accessToken),
      call(filtersApi.getWorkoutLevelsList, accessToken),
      call(filtersApi.getWorkoutTypes, accessToken),
    ])
    
    if ([201, 200].includes(coaches.status)
    && [201, 200].includes(equipment.status)
    && [201, 200].includes(workoutLevels.status)
    && [201, 200].includes(types.status)
    ) {
      yield put(filterActions.getCoachesSuccess(getFilterArray(coaches.data.items)));
      yield put(filterActions.getEquipmentSuccess(getFilterArray(equipment.data)));
      yield put(filterActions.getWorkoutLevelsSuccess(getFilterArray(workoutLevels.data)));
      yield put(filterActions.getWorkoutTypesSuccess(getFilterArray(types.data)));      
    } 

    yield put(appActions.closeLoader());
  } catch (e) {
    yield put(appActions.closeLoader());
  }
}

export default function* WatcherSaga() {
  yield takeLatest(filterConstants.GET_ALL_FILTER_DATA, getAllFilterData);
}
