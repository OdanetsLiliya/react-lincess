import axios from 'axios';

import { setAuthHeader } from '../../utils/headers';

import {
  UserSignUpType,
  UserSignUpResponseType,
  TokensType
} from '../../types/authTypes';

export const authApi = {
  logIn: async (payload: { user: UserSignUpType }) => {
    const resp : { user: UserSignUpResponseType, tokens:TokensType } | any = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      payload
    );
    return resp?.response || resp;
  },
  signUp: async (payload: { user: UserSignUpType }) => {
    const resp : { user: UserSignUpResponseType, tokens:TokensType } | any  = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      payload
    );
    return resp?.response || resp;
  },
  refreshToken: async (id: string | number, token : string) => {
    const resp : TokensType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}/refresh/${id}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  logout: async (id: string | number, token : string) => {
    const resp : any = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/logout/${id}`,
      setAuthHeader(token)
    );
    return resp?.response || resp;
  },
  getUserByID: async (id: string | number, token : string) => {
    const resp : UserSignUpResponseType | any = await axios.get(
      `${process.env.REACT_APP_API_URL}users/${id}`,
      setAuthHeader(token)
    );
    return resp.data;
  },
};
