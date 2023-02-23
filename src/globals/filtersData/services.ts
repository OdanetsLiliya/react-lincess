import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachesType } from '../../types/coachesTypes';
import { FilterCommonType } from '../../types/filterTypes';

export const filtersApi = {
  getCoachesList: async (token: string) => {
    const resp = await axios.get<CoachesType>(
      `${process.env.REACT_APP_API_URL}/coaches`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getEquipmentList: async (token: string) => {
    const resp = await axios.get<Array<FilterCommonType>>(
      `${process.env.REACT_APP_API_URL}/equipment`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getWorkoutLevelsList: async (token: string) => {
    const resp = await axios.get<Array<FilterCommonType>>(
      `${process.env.REACT_APP_API_URL}/workout-levels`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getWorkoutTypes: async (token: string) => {
    const resp = await axios.get<Array<FilterCommonType>>(
      `${process.env.REACT_APP_API_URL}/workout-types`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
};
