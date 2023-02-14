import { RootStateType } from "../../Stores"

export const getAccessToken = (state: RootStateType) => state.auth?.tokens?.accessToken;

export const getRefreshToken = (state: RootStateType) => state.auth?.tokens?.refreshToken;

export const getUser = (state: RootStateType) => state.auth?.user;