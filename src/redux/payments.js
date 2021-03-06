import { takeLatest, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, auth } from '../redux';

//
// ACTIONS

export const CREATE_PAYMENT = '@ payments / CREATE_PAYMENT'
export const GET_PAYMETNS = '@ payments / GET_PAYMETNS'
export const YOUR_PAYMENT_CREATED_SUCCESSFULLY = '@ payments / YOUR_PAYMENT_CREATED_SUCCESSFULLY'

export const createPayment = (payload) => ({type: CREATE_PAYMENT, payload})

//
// REDUCERS

const initialState = {}

export function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case YOUR_PAYMENT_CREATED_SUCCESSFULLY:
        return {
            ...state,
            current: action.payload.data.undefined
        }
      default:
        return api.reduceRequests('payments', state, action)
    }
}

//
// SAGAS

export function* saga() {
    yield takeLatest(CREATE_PAYMENT, createPaymentHandler)
    yield takeLatest(auth.ACCESS_GRANTED, getPaymentsHandler)
}

function* createPaymentHandler({ payload }) {
    const shopURL = api.buildURL('payments');
   yield put(api.create(shopURL, payload));

  const { success } = yield race({
    success: take(api.payments.CREATE_SUCCEEDED),
    failure: take(api.payments.CREATE_FAILED)
  });

  if(success) {
      yield put({type: YOUR_PAYMENT_CREATED_SUCCESSFULLY, payload: success.payload})
  }
}

function* getPaymentsHandler() {
    const shopURL = api.buildURL('payments');
   yield put(api.get(shopURL));
}

//
// SELECTORS

export const getState = (state) => (state.payments)
export const getEntities = createSelector(
    getState,
    (state) =>  state.entities && state.entities.undefined 
)