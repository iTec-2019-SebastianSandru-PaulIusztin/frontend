import { takeLatest, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, auth } from '../redux'
import { REFRESH_CURRENT_USER } from './auth';

//
// ACTIONS

export const ADD_SHOP = '@ shops / ADD_SHOP'
export const ADD_TO_CART = '@ shops / ADD_TO_CART'
export const GET_CART = '@ shops / GET_CART'
export const GET_CART_SUCCEEDED = '@ shops / GET_CART_SUCCEEDED'
export const GET_CURRENT_SHOP_SUCCEEDED = '@ shops / GET_CURRENT_SHOP_SUCCEEDED'

export const addShop = (payload) => ({type: ADD_SHOP, payload})
export const getCart = () => ({type: GET_CART})
export const addToCart = (item) => ({type: ADD_TO_CART, payload: { items: [ { product_id: item.id } ]}})

//
// REDUCERS

const initialState = {}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case GET_CURRENT_SHOP_SUCCEEDED:
        return {
          ...state,
          current: action.payload.data.undefined
        }
      case GET_CART_SUCCEEDED:
        return {
          ...state,
          cart: action.payload.data.undefined
        }
      default:
        return api.reduceRequests('shops', state, action)
    }
}

// SAGAS

export function* saga() {
    yield takeLatest(ADD_SHOP, addShopHandler)
    yield takeLatest(ADD_TO_CART, addToCartHandler)
    yield takeLatest(GET_CART, getCartHandler)
    yield takeLatest(auth.ACCESS_GRANTED, getCurrentShopHandler)
}

function* addShopHandler({ payload }) {
  const shopURL = api.buildURL('shops');
  yield put(api.create(shopURL, payload));

  const { success } = yield race({
    success: take(api.shops.CREATE_SUCCEEDED),
    failure: take(api.shops.CREATE_FAILED)
  });

  if(success) {
      yield put({type: GET_CURRENT_SHOP_SUCCEEDED, payload: success.payload})
  }
}

function* addToCartHandler({ payload }) {
  const shopURL = api.buildURL('buyer', { id: 'shop-cart'});
  yield put(api.update(shopURL, payload));
}

function* getCartHandler() {
  const shopURL = api.buildURL('buyer', { id: 'shop-cart' });
    yield put(api.get(shopURL));

  const { success } = yield race({
    success: take(api.shops.GET_SUCCEEDED),
    failure: take(api.shops.GET_FAILED)
  });

  if(success) {
      yield put({type: GET_CART_SUCCEEDED, payload: success.payload})
  }
}


function* getCurrentShopHandler() {
  const shopURL = api.buildURL('shops', { id: 'me' });
    yield put(api.get(shopURL));

  const { success } = yield race({
    success: take(api.shops.GET_SUCCEEDED),
    failure: take(api.shops.GET_FAILED)
  });

  if(success) {
      yield put({type: GET_CURRENT_SHOP_SUCCEEDED, payload: success.payload})
  }
}

export const getState = (state) => (state.shops)
export const getCurrentShop= createSelector(
  getState,
  (state) => state.current
)
export const getCurrentCart = createSelector(
  getState,
  (state) => state.cart
)
export const getCurrentCartProducts = createSelector(
  getCurrentCart,
  (state) => state && state.products
)
