import { takeLatest, put, call, race, take, takeEvery, select } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, auth } from '../redux'
import { REFRESH_CURRENT_USER } from './auth';

//
// ACTIONS

export const ADD_PRODUCT = '@ shops / ADD_PRODUCT'
export const GET_PRODUCTS = '@ shops / GET_PRODUCTS'

export const addProduct  = (payload) => ({type: ADD_PRODUCT, payload})
export const getProducts = (payload) => ({type: GET_PRODUCTS, payload}) 


//
// REDUCERS

const initialState = {
    params: {}
}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case GET_PRODUCTS: 
        return {
            params: {
                ...state.params,
                ...action.payload
            }
        }
      default:
        return api.reduceRequests('products', state, action)
    }
}

// SAGAS

export function* saga() {
    yield takeLatest([auth.ACCESS_GRANTED, GET_PRODUCTS], getProductsHandler);
}

function* getProductsHandler() {
  const params = yield select(getParams)
  const shopURL = api.buildURL('products', params);
  yield put(api.get(shopURL));
}

export const getState = (state) => (state.products)
export const getParams = createSelector(
    getState,
    (state) => state.params
)
export const getEntities = createSelector(
  getState,
  (state) => state.entities && state.entities.undefined
)

