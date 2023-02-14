import * as workoutConstants from './constants';

import { ActionTypes } from './actions';

import { Workout } from '../../types/workoutTypes';
import { WorkoutType } from '../../types/workoutTypeTypes';

export type InitialStateType = {
  workouts: {
    items: Workout[],
    count: number
  },
  workout_types: WorkoutType[];
  detailedWorkout: Workout | {};
  filterData: any
};

const initialState = {
  workouts: {
    items: [],
    count: 0
  },
  workout_types: [],
  detailedWorkout: {},
  filterData: {}
};

const workoutReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case workoutConstants.GET_WORKOUTS_LIST_SUCCESS:
      return {
        ...state,
        workouts: action.payload
      };
    case workoutConstants.GET_WORKOUT_BY_ID_SUCCESS:
      return {
        ...state,
        detailedWorkout: action.payload
      };
    case workoutConstants.GET_WORKOUT_TYPES_SUCCESS:
      return {
        ...state,
        workout_types: action.payload
      };
    default:
      return state;
  }
};

export default workoutReducer;
