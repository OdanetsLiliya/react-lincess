import moment from 'moment';
import { Dispatch } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

import { InferActionsTypes, RootStateType } from './index';

import { authActions } from '../globals/auth/actions';

const jwtRefreshMiddleware = ({ dispatch, getState} : { getState: () => RootStateType, dispatch: Dispatch<AnyAction>  }) => {
    return (next: (action: InferActionsTypes<any>) => void) =>
        (action: InferActionsTypes<any>) => {
            if (![
                'OPEN_LOADER',
                'CLOSE_LOADER',
                'persist/PERSIST',
                'persist/REHYDRATE',
                'REFRESH_TOKEN',
                'LOG_OUT_SUCCESS',
                'REFRESH_TOKEN_SUCCESS',
                'SET_REFRESHING'
            ].includes(action.type)) {
                const accessExpiryDate = getState().auth.tokens?.accessExpiryDate;
                const refreshing = getState().app.refreshing;
                if (accessExpiryDate && moment(accessExpiryDate).diff(moment(), 'minutes') < 1 && !refreshing) {
                    return dispatch(authActions.refreshToken({ action }))
                }
            }
            return next(action);
        }
}

export default jwtRefreshMiddleware;