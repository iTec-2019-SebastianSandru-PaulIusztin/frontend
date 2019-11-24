import { takeLatest, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, auth, payments } from '../redux'
import { REFRESH_CURRENT_USER } from './auth';

//
// ACTIONS

export const ADD_SHOP = '@ shops / ADD_SHOP'
export const ADD_TO_CART = '@ shops / ADD_TO_CART'
export const GET_CART = '@ shops / GET_CART'
export const GET_CART_SUCCEEDED = '@ shops / GET_CART_SUCCEEDED'
export const GET_CURRENT_SHOP_SUCCEEDED = '@ shops / GET_CURRENT_SHOP_SUCCEEDED'
export const GET_SELLER_SHOP = '@ shops / GET_SELLER_SHOP'
export const GET_SELLER_SHOP_SUCCEEDED = '@ shops / GET_SELLER_SHOP_SUCCEEDED'


export const addShop = (payload) => ({type: ADD_SHOP, payload})
export const getCart = () => ({type: GET_CART})
export const addToCart = (item) => ({type: ADD_TO_CART, payload: { items: [ { product_id: item.id } ]}})
export const getSellerShop = (id) => ({type: GET_SELLER_SHOP, payload: { id }})

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
      case payments.YOUR_PAYMENT_CREATED_SUCCESSFULLY:
        return {
          ...state,
          cart: {
            ...state.cart,
            items: []
          }
        }
      case GET_SELLER_SHOP_SUCCEEDED:
        return {
          ...state,
          seller_shop: action.payload.data.undefined
        }
      default:
        return api.reduceRequests('shops', state, action)
    }
}

// SAGAS

export function* saga() {
    yield takeLatest(ADD_SHOP, addShopHandler)
    yield takeLatest(ADD_TO_CART, addToCartHandler)
    yield takeLatest(auth.ACCESS_GRANTED, getAllShops)
    yield takeLatest(GET_SELLER_SHOP, getUserShop)
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
  yield put(auth.refresh())
}

function* getAllShops() {
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

function* getUserShop({ payload }) {
  const { id } = payload
  const shopURL = api.buildURL('shops', { id  });
    yield put(api.get(shopURL));

  const { success } = yield race({
    success: take(api.shops.GET_SUCCEEDED),
    failure: take(api.shops.GET_FAILED)
  });

  if(success) {
      yield put({type: GET_SELLER_SHOP_SUCCEEDED, payload: success.payload})
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
  (state) => state && state.items
)
export const getSellerCartProducts = createSelector(
  getCurrentCart,
  (state) => state && state.seller_shop
)
