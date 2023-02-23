import { RootStateType } from "../../stores"

export const getToken = (state: RootStateType) => state.auth?.tokens;

export const getUser = (state: RootStateType) => state.auth?.user;
