import * as filterConstants from './constants';

import { ActionTypes } from './actions';

import { FilterType, SelectedFiltersType } from '../../types/filterTypes';

export type InitialStateType = {
  coaches: Array<FilterType>,
  workoutLevels: Array<FilterType>,
  equipment: Array<FilterType>,
  workoutTypes: Array<FilterType>,
  selectedFilters: SelectedFiltersType
};

const initialState = {
  coaches: [],
  workoutLevels: [],
  equipment: [],
  workoutTypes: [],
  selectedFilters: {
    levels: {},
    equipments: {},
    workoutTypes: {},
    page: 0,
    take: 12
  }
};

const filterReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case filterConstants.GET_COACHES_FILTER_SUCCESS:
      return {
        ...state,
        coaches: action.payload,
      };
    case filterConstants.GET_EQUIPMENT_SUCCESS:
      return {
        ...state,
        equipment: action.payload
      };
    case filterConstants.GET_WORKOUT_LEVELS_SUCCESS:
      return {
        ...state,
        workoutLevels: action.payload
      };
    case filterConstants.GET_WORKOUT_TYPES_FILTER_SUCCESS:
      return {
        ...state,
        workoutTypes: action.payload
      };
    case filterConstants.SELECT_FILTERS:
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          ...action.payload
        }
      };
    case filterConstants.CLEAR_FILTERS:
      return {
        ...state,
        selectedFilters: initialState.selectedFilters
      };
    default:
      return state;
  }
};

export default filterReducer;
