import createSagaMiddleware from 'redux-saga';

import jwtRefreshMiddleware from './jwtRefreshMiddleware';

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, jwtRefreshMiddleware];

export default middleware;
