import { combineReducers } from 'redux';

import authReducer from '../globals/auth/reducer';
import appReducer from '../globals/app/reducer';
import coachesReduser from '../globals/coaches/reducer';
import workoutsReduser from '../globals/workouts/reducer';
import filterReduser from '../globals/filtersData/reducer';

export const whiteListReducers = {
  auth: authReducer,
  filter: filterReduser,
};

export const blackListReducers = {
  app: appReducer,
  coach: coachesReduser,
  workout: workoutsReduser,
};

const rootReducer = combineReducers({
  ...blackListReducers,
  ...whiteListReducers,
});

export default rootReducer;
