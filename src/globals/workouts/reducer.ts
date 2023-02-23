import * as workoutConstants from './constants';

import { ActionTypes } from './actions';

import { Workout } from '../../types/workoutTypes';
import { WorkoutType } from '../../types/workoutTypeTypes';

export type InitialStateType = {
  workouts: {
    items: Workout[],
    count: number
  },
  detailedWorkout: Workout;
};

const initialState = {
  workouts: {
    items: [] as Workout[],
    count: 0
  },
  detailedWorkout: {} as Workout,
};

const workoutReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case workoutConstants.GET_WORKOUTS_LIST_SUCCESS:
      return {
        ...state,
        workouts: action.payload as {
          items: Workout[],
          count: number
        }
      };
    case workoutConstants.GET_WORKOUT_BY_ID_SUCCESS:
      return {
        ...state,
        detailedWorkout: action.payload as Workout
      };
    default:
      return state;
  }
};

export default workoutReducer;
