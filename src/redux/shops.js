import { takeLatest, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, auth } from '../redux'
import { REFRESH_CURRENT_USER } from './auth';

//
// ACTIONS

export const ADD_SHOP = '@ shops / ADD_SHOP'
export const GET_CURRENT_SHOP_SUCCEEDED = '@ shops / GET_CURRENT_SHOP_SUCCEEDED'

export const addShop = (paylaod) => ({type: ADD_SHOP, paylaod})

//
// REDUCERS

const initialState = {}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case GET_CURRENT_SHOP_SUCCEEDED:
        return {
          ...state,
          current: action.payload
        }
      default:
        return api.reduceRequests('shops', state, action)
    }
}

// SAGAS

export function* saga() {
    yield takeLatest(ADD_SHOP, addShopHandler)
    yield takeLatest(auth.ACCESS_GRANTED, getCurrentShopHandler)
}

function* addShopHandler({ payload }) {
  const shopURL = api.buildURL('stores');
  yield put(api.create(shopURL, payload));

  const { success } = yield race({
    success: take(api.stores.CREATE_SUCCEEDED),
    failure: take(api.stores.CREATE_FAILED)
  });

  if(success) {
      yield put({type: GET_CURRENT_SHOP_SUCCEEDED, payload: success.payload})
  }
}

function* getCurrentShopHandler() {
  const shopURL = api.buildURL('stores', { id: 'me' });
    yield put(api.get(shopURL));

  const { success } = yield race({
    success: take(api.stores.GET_SUCCEEDED),
    failure: take(api.stores.GET_FAILED)
  });

  if(success) {
      yield put({type: GET_CURRENT_SHOP_SUCCEEDED, payload: success.payload})
  }
}

