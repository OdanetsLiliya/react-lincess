import * as coachConstants from './constants';

import { ActionTypes } from './actions';

import { CoachType, CoachesType } from '../../types/coachesTypes';

export type InitialStateType = {
  coaches: CoachesType,
  detailedCoach: CoachType;
};

const initialState = {
  coaches: {
    items: [] as Array<CoachType>,
    count: 0
  },
  detailedCoach: {} as CoachType
};

const coachReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case coachConstants.GET_COACHES_LIST_SUCCESS:
      return {
        ...state,
        coaches: action.payload as CoachesType,
      };
    case coachConstants.GET_DETAILED_COACH_SUCCESS:
      return {
        ...state,
        detailedCoach: action.payload as CoachType
      };
    default:
      return state;
  }
};

export default coachReducer;
