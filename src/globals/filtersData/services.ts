import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import { CoachesType } from '../../types/coachesTypes';
import { FilterCommonType } from '../../types/filterTypes';

export const filtersApi = {
  getCoachesList: async (token: string) => {
    const resp: CoachesType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/coaches`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getEquipmentList: async (token: string) => {
    const resp : Array<FilterCommonType> | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/equipment`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getWorkoutLevelsList: async (token: string) => {
    const resp : Array<FilterCommonType> | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/workout-levels`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getWorkoutTypes: async (token: string) => {
    const resp : Array<FilterCommonType> | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/workout-types`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
};
