import { all } from 'redux-saga/effects';

import WatcherAuthSaga from '../globals/auth/sagas';
import WatcherCoachesSaga from '../globals/coaches/sagas';
import WatcherWorkoutsSaga from '../globals/workouts/sagas';
import WatcherFiltersSaga from '../globals/filtersData/sagas';

export default function* rootSaga() {
  yield all([
    WatcherAuthSaga(),
    WatcherCoachesSaga(),
    WatcherWorkoutsSaga(),
    WatcherFiltersSaga()
  ]);
}
