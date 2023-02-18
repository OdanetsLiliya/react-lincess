import { InferActionsTypes } from '../../Stores';
import * as coachConstants from './constants';

import { FilterType, UpdateSelectedFiltersType } from '../../types/filterTypes';

export const filterActions = {
  getEquipment: (payload: {}) =>
  ({
    type: coachConstants.GET_EQUIPMENT,
    payload,
  }),
  getEquipmentSuccess: (payload : FilterType[]) =>
  ({
    type: coachConstants.GET_EQUIPMENT_SUCCESS,
    payload,
  }),
  getWorkoutLevels: (payload : {}) =>
  ({
    type: coachConstants.GET_WORKOUT_LEVELS,
    payload
  }),
  getWorkoutLevelsSuccess: (payload : FilterType[]) =>
  ({
    type: coachConstants.GET_WORKOUT_LEVELS_SUCCESS,
    payload
  }),
  getCoaches: (payload : {}) =>
  ({
    type: coachConstants.GET_COACHES_FILTER,
    payload
  }),
  getCoachesSuccess: (payload : FilterType[]) =>
  ({
    type: coachConstants.GET_COACHES_FILTER_SUCCESS,
    payload
  }),
  getAllFilterData: (payload : {}) =>
  ({
    type: coachConstants.GET_ALL_FILTER_DATA,
    payload
  }),
  getWorkoutTypes: (payload : {}) =>
  ({
    type: coachConstants.GET_WORKOUT_TYPES_FILTER,
    payload
  }),
  getWorkoutTypesSuccess: (payload : FilterType[]) =>
  ({
    type: coachConstants.GET_WORKOUT_TYPES_FILTER_SUCCESS,
    payload
  }),
  selectFilters: (payload : UpdateSelectedFiltersType) =>
  ({
    type: coachConstants.SELECT_FILTERS,
    payload
  }),
  clearFilters: (payload : null) =>
  ({
    type: coachConstants.CLEAR_FILTERS,
    payload
  }),
};

export type ActionTypes = InferActionsTypes<typeof filterActions>;
