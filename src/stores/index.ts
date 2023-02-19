import { compose } from 'redux';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import rootSaga from './sagas';
import rootReducer, { blackListReducers, whiteListReducers } from './reducers';
import middleware, { sagaMiddleware } from './middleware';

export const history = createBrowserHistory();

const reducer = persistReducer<RootStateType>(
  {
    key: 'root',
    storage,
    whitelist: Object.keys(whiteListReducers),
    blacklist: Object.keys(blackListReducers),
  },
  rootReducer
);

type PropertyTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertyTypes<T>>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type RootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer,
  middleware: [...middleware],
});
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };