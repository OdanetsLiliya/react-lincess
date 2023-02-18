import { InferActionsTypes } from '../../Stores';
import * as authConstants from './constants';

import {
  TokensType,
  UserSignUpResponseType,
  UserSignUpType
} from '../../types/authTypes';

export const authActions = {
  logIn: (payload: UserSignUpType) =>
    ({
      type: authConstants.LOG_IN,
      payload,
    }) as const,
  signUp: (payload: { user: UserSignUpType }) =>
    ({
      type: authConstants.SIGN_UP,
      payload,
    }) as const,
  logInSignUpSuccess: (payload: { user: UserSignUpResponseType, tokens: TokensType }) =>
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
  getProfile: (payload: {
    id: string
  }) =>
    ({
      type: authConstants.GET_PROFILE,
      payload
    }) as const,
  getProfileSuccess: (payload: UserSignUpResponseType) =>
    ({
      type: authConstants.GET_PROFILE_SUCCESS,
      payload
    }) as const,
  refreshToken: (payload: {
    action: InferActionsTypes<any>
  }) =>
    ({
      type: authConstants.REFRESH_TOKEN,
      payload
    }) as const,
  refreshTokenSuccess: (payload: TokensType) =>
    ({
      type: authConstants.REFRESH_TOKEN_SUCCESS,
      payload
    }) as const,
};

export type ActionTypes = InferActionsTypes<typeof authActions>;
