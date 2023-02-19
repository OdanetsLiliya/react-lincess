import { InferActionsTypes } from '../../stores';
import * as coachConstants from './constants';

import { Workout } from '../../types/workoutTypes';

export const workoutActions = {
  getWorkoutsList: (payload: string) =>
  ({
    type: coachConstants.GET_WORKOUTS_LIST,
    payload,
  }),
  getWorkoutsListSuccess: (payload: {
    items: Workout[],
    count: number
  }) =>
  ({
    type: coachConstants.GET_WORKOUTS_LIST_SUCCESS,
    payload,
  }),
  getDetailedWorkout: (payload: { id: number | string }) =>
  ({
    type: coachConstants.GET_WORKOUT_BY_ID,
    payload,
  }),
  getDetailedWorkoutSuccess: (payload: Workout) =>
  ({
    type: coachConstants.GET_WORKOUT_BY_ID_SUCCESS,
    payload,
  }),
  editWorkout: (payload: { id: number | string, data: Workout }) =>
  ({
    type: coachConstants.EDIT_WORKOUT,
    payload,
  }),
  editWorkoutSuccess: (payload: Workout) =>
  ({
    type: coachConstants.EDIT_WORKOUT_SUCCESS,
    payload,
  }),
};

export type ActionTypes = InferActionsTypes<typeof workoutActions>;
