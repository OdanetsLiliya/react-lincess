import * as coachConstants from './constants';

import { ActionTypes } from './actions';

import { CoachType, CoachesType } from '../../types/coachesTypes';

export type InitialStateType = {
  coaches: CoachesType,
  detailedCoach: CoachType | {};
};

const initialState = {
  coaches: {
    items: [],
    count: 0
  },
  detailedCoach: {}
};

const coachReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case coachConstants.GET_COACHES_LIST_SUCCESS:
      return {
        ...state,
        coaches: action.payload,
      };
    case coachConstants.GET_DETAILED_COACH_SUCCESS:
      return {
        ...state,
        detailedCoach: action.payload
      };
    default:
      return state;
  }
};

export default coachReducer;
