import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachType, CoachesType } from '../../types/coachesTypes';

export const coachesApi = {
  getCoachesList: async (query: string, token: string) => {
    const resp: CoachesType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/coaches`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getCoach: async (id : string | number, token: string) => {
    const resp : CoachType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/coaches/${id}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
};
