import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { Workout } from '../../types/workoutTypes';

export const workoutsApi = {
  getWorkoutsList: async (query: string, token: string) => {
    const resp = await axios.get<{
      items: Workout[],
      count: number
    }>(
      `${process.env.REACT_APP_API_URL}/workouts?${query}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getWorkoutById: async (id: string | number, token: string) => {
    const resp = await axios.get<Workout>(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  editWorkout: async (id: string | number, data: Workout, token: string) => {
    const resp = await axios.put<Workout>(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      data,
      setAuthHeader(token)
    );
    return resp?.data;
  },
};
