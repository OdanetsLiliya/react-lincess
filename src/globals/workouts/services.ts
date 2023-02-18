import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachType, CoachesType } from '../../types/coachesTypes';
import { Workout } from '../../types/workoutTypes';

export const workoutsApi = {
  getWorkoutsList: async (query: string, token: string) => {
    const resp = await axios.get<CoachesType>(
      `${process.env.REACT_APP_API_URL}/workouts?${query}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getWorkoutById: async (id: string | number, token: string) => {
    const resp = await axios.get<CoachType>(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getWorkoutTypes: async (id: string | number, token: string) => {
    const resp = await axios.get<CoachType>(
      `${process.env.REACT_APP_API_URL}/workout-types?coach=${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  editWorkout: async (id: string | number, data: Workout, token: string) => {
    const resp = await axios.put<CoachType>(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      data,
      setAuthHeader(token)
    );
    return resp?.data;
  },
};
