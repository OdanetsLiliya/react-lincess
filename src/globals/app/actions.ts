import { InferActionsTypes } from '../../Stores';

import * as appConstants from './constants';

export const appActions = {
  openLoader: () =>
    ({
      type: appConstants.OPEN_LOADER,
    }) as const,
  closeLoader: () =>
    ({
      type: appConstants.CLOSE_LOADER,
    }) as const,
  setMessage: (payload: {
    message: string,
    isShowMessage: boolean
  }) =>
    ({
      type: appConstants.SET_MESSAGE,
      payload
    }) as const,
  setRefreshing: (payload: boolean) =>
    ({
      type: appConstants.SET_REFRESHING,
      payload
    }) as const,
  setRoute: (payload: string | null) =>
    ({
      type: appConstants.SET_ROUTE,
      payload
    }) as const,
};

export type ActionTypes = InferActionsTypes<typeof appActions>;
