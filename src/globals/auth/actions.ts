import { InferActionsTypes } from '../../Stores';
import * as authConstants from './constants';

import { 
  UserSignUpType
} from '../../types/authTypes';

export const authActions = {
  logIn: (payload: UserSignUpType) =>
  ({
    type: authConstants.LOG_IN,
    payload,
  }) as const,
  signUp: (payload: any) =>
  ({
    type: authConstants.SIGN_UP,
    payload,
  }) as const,
  logInSignUpSuccess: (payload) =>
  ({
    type: authConstants.LOG_IN_SIGN_UP_SUCCESS,
    payload,
  }) as const,
  logOut: (payload: {
    id: number
  }) =>
  ({
    type: authConstants.LOG_OUT,
    payload
  }) as const,
  logoutSuccess: () =>
  ({
    type: authConstants.LOG_OUT_SUCCESS,
  }) as const,
  getProfile: (payload: any) =>
  ({
    type: authConstants.GET_PROFILE,
    payload
  }) as const,
  getProfileSuccess: (payload: any) =>
  ({
    type: authConstants.GET_PROFILE_SUCCESS,
    payload
  }) as const,
  refreshToken: (payload) =>
  ({
    type: authConstants.REFRESH_TOKEN,
    payload
  }) as const,
  refreshTokenSuccess: (payload) =>
  ({
    type: authConstants.REFRESH_TOKEN_SUCCESS,
    payload
  }) as const,
};

export type ActionTypes = InferActionsTypes<typeof authActions>;
