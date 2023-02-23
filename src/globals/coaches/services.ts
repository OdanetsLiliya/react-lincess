import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachType, CoachesType } from '../../types/coachesTypes';

export const coachesApi = {
  getCoachesList: async (query: string, token: string) => {
    const resp = await axios.get<CoachesType>(
      `${process.env.REACT_APP_API_URL}/coaches`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getCoach: async (id: string | number, token: string) => {
    const resp = await axios.get<CoachType>(
      `${process.env.REACT_APP_API_URL}/coaches/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
};
