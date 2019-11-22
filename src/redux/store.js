import localforage from 'localforage';

import * as storeUtils from './storeUtils';

import * as modules from '../redux';

const persistedReducers = ['auth'];

const persistConfig = {
  key: 'root',
  whitelist: persistedReducers,
  storage: localforage
};

const initialState = {};
const rootReducer = storeUtils.createRootReducer(modules, persistConfig);
const rootSaga = storeUtils.createRootSaga(modules);

export const { store, persistor } = storeUtils.createPersistedStore(
  rootReducer,
  rootSaga,
  initialState
);
