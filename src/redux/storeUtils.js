import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { createLogger } from 'redux-logger';

import { persistStore, purgeStoredState, persistCombineReducers } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import { fork, all } from 'redux-saga/effects';

import { map, reduce, compact, has, isEmpty } from 'lodash';

export function createRootReducer(modules, persistConfig) {
  const reducers = reduce(
    modules,
    (acc, module, key) => {
      if (!has(module, 'reducer')) {
        return acc;
      }
      return {
        ...acc,
        [key]: module.reducer
      };
    },
    {}
  );

  if (isEmpty(persistConfig)) {
    return combineReducers(reducers);
  }

  const rootReducer = persistCombineReducers(persistConfig, reducers);
  const { auth } = modules;

  return (state, action) => {
    if (action.type === auth.LOGOUT) {
      purgeStoredState(persistConfig);
      return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
  };
}

export function createRootSaga(modules) {
  const sagas = compact(map(modules, 'saga'));

  return function* rootSaga() {
    yield all(map(sagas, (saga) => fork(saga)));
  };
}

export function createStore(
  rootReducer,
  rootSaga,
  initialState = {},
  customMiddleware = []
) {
  const middleware = [];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      level: 'info',
      collapsed: true,
      timestamp: false,
      duration: true
    });
    middleware.push(logger);
  }

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const store = createReduxStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware, ...customMiddleware), ...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export function createPersistedStore(
  rootReducer,
  rootSaga,
  initialState = {},
  customMiddleware = []
) {
  const store = createStore(rootReducer, rootSaga, initialState, customMiddleware);
  const persistor = persistStore(store, {
    debug: process.env.NODE_ENV === 'development'
  });
  return { store, persistor };
}
