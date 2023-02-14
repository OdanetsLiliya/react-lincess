import * as appConstants from './constants';

import { ActionTypes } from './actions';

export type InitialStateType = {
  loading: boolean;
  message: string;
  isShowMessage: boolean;
  refreshing: boolean;
  route: string | null;
};

const initialState = {
  loading: false,
  message: '',
  isShowMessage: false,
  refreshing: false,
  route: null
};

const appReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case appConstants.OPEN_LOADER:
      return {
        ...state,
        loading: true,
      };
    case appConstants.CLOSE_LOADER:
      return {
        ...state,
        loading: false,
    };
    case appConstants.SET_MESSAGE:
      return {
        ...state,
        isShowMessage: action.payload.isShowMessage,
        message: action.payload.message,
    };
    case appConstants.SET_REFRESHING:
      return {
        ...state,
        refreshing: action.payload,
    };
    case appConstants.SET_ROUTE:
      return {
        ...state,
        route: action.payload,
    };
    default:
      return state;
  }
};

export default appReducer;
