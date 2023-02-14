import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachType, CoachesType } from '../../types/coachesTypes';
import { Workout } from '../../types/workoutTypes';

export const workoutsApi = {
  getWorkoutsList: async (query: any, token: string) => {
    const resp: CoachesType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/workouts?${query}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getWorkoutById: async (id : string | number, token: string) => {
    const resp : CoachType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getWorkoutTypes: async (id : string | number, token: string) => {
    const resp : CoachType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/workout-types?coach=${id}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  editWorkout: async (id : string | number, data: Workout, token: string) => {
    const resp : CoachType | any = await axios.put(
      `${process.env.REACT_APP_API_URL}/workouts/${id}`,
      data,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
};
