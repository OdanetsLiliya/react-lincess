import { InferActionsTypes } from '../../stores';
import * as coachConstants from './constants';

import { CoachType, CoachesType } from '../../types/coachesTypes';

export const coachesActions = {
  getCoachesList: (payload: {}) =>
  ({
    type: coachConstants.GET_COACHES_LIST,
    payload,
  }),
  getCoachesListSuccess: (payload: CoachesType) =>
  ({
    type: coachConstants.GET_COACHES_LIST_SUCCESS,
    payload,
  }),
  getCoachDetailed: (payload: { id: number | string }) =>
  ({
    type: coachConstants.GET_DETAILED_COACH,
    payload
  }),
  getCoachDetailedSuccess: (payload: CoachType) =>
  ({
    type: coachConstants.GET_DETAILED_COACH_SUCCESS,
    payload
  }),
};

export type ActionTypes = InferActionsTypes<typeof coachesActions>;
