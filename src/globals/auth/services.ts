import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import {
  UserSignUpType,
  UserSignUpResponseType,
  TokensType
} from '../../types/authTypes';

export const authApi = {
  logIn: async (payload: { user: UserSignUpType }) => {
    const resp = await axios.post<{ user: UserSignUpResponseType, tokens: TokensType }>(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      payload
    );
    return resp?.data;
  },
  signUp: async (payload: { user: UserSignUpType }) => {
    const resp = await axios.post<{ user: UserSignUpResponseType, tokens: TokensType }>(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      payload
    );
    return resp?.data;
  },
  refreshToken: async (id: string | number, token: string) => {
    const resp = await axios.get<TokensType>(
      `${process.env.REACT_APP_API_URL}/refresh/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  logout: async (id: string | number, token: string) => {
    const resp = await axios.get<{ status: string }>(
      `${process.env.REACT_APP_API_URL}/auth/logout/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
  getUserByID: async (id: string | number, token: string) => {
    const resp = await axios.get<UserSignUpResponseType>(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      setAuthHeader(token)
    );
    return resp?.data;
  },
};
