import { InferActionsTypes } from '../../Stores';
import * as coachConstants from './constants';

import { Workout } from '../../types/workoutTypes';

export const workoutActions = {
  getWorkoutsList: (payload: any) =>
  ({
    type: coachConstants.GET_WORKOUTS_LIST,
    payload,
  }),
  getWorkoutsListSuccess: (payload : Workout) =>
  ({
    type: coachConstants.GET_WORKOUTS_LIST_SUCCESS,
    payload,
  }),
  getDetailedWorkout: (payload : { id: number | string }) =>
  ({
    type: coachConstants.GET_WORKOUT_BY_ID,
    payload,
  }),
  getDetailedWorkoutSuccess: (payload : Workout) =>
  ({
    type: coachConstants.GET_WORKOUT_BY_ID_SUCCESS,
    payload,
  }),
  getWorkoutTypes: (payload : { id?: number | string }) =>
  ({
    type: coachConstants.GET_WORKOUT_TYPES,
    payload,
  }),
  getWorkoutTypesSuccess: (payload : Workout) =>
  ({
    type: coachConstants.GET_WORKOUT_TYPES_SUCCESS,
    payload,
  }),
  getFilterData: (payload : { id: number | string }) =>
  ({
    type: coachConstants.GET_FILTER_DATA,
    payload,
  }),
  getFilterDataSuccess: (payload: any) =>
  ({
    type: coachConstants.GET_FILTER_DATA,
    payload,
  }),
  editWorkout: (payload : { id: number | string, data: Workout }) =>
  ({
    type: coachConstants.EDIT_WORKOUT,
    payload,
  }),
  editWorkoutSuccess: (payload: any) =>
  ({
    type: coachConstants.EDIT_WORKOUT_SUCCESS,
    payload,
  }),
};

export type ActionTypes = InferActionsTypes<typeof workoutActions>;
