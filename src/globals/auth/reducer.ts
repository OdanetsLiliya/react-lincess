import * as authConstants from './constants';

import { ActionTypes } from './actions';

import { 
  UserType,
  TokensType
} from '../../types/authTypes';

export type InitialStateType = {
  user: UserType | {};
  tokens: TokensType | {};
};

const initialState = {
  user: {},
  tokens: {}
};

const authReducer = (
  state: InitialStateType = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case authConstants.LOG_IN_SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
      };
    case authConstants.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        tokens: action.payload
      };
    case authConstants.LOG_OUT_SUCCESS:
      return {
        ...initialState
      };
    case authConstants.GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
