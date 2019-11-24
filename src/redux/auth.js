import { takeLatest, put, call, race, take, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect'

import { api, shops } from '../redux';
import { getCredentials, getToken, setCredentials, setToken, clear } from '../core/storage'
import Geocode from "react-geocode";

//
// ACTIONS
export const REHYDRATE = "persist/REHYDRATE";

export const LOGOUT = '@ auth / LOGOUT';
export const SIGNUP = '@ auth / SIGNUP';
export const LOGIN = '@ auth / LOGIN';
export const VERIFY = '@ auth / VERIFY';
export const IS_AUTHENTICATED = '@ auth / IS_AUTHENTICATED';

export const LOGIN_SUCCEEDED = '@ auth / LOGIN_SUCCEEDED';
export const LOGIN_FAILED = '@ auth / LOGIN_FAILED';

export const SIGNUP_SUCCEEDED = '@ auth / SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = '@ auth / SIGNUP_FAILED';

export const VERIFY_SUCCEEDED = '@ auth / VERIFY_SUCCEEDED';
export const VERIFY_FAILED = '@ auth / VERIFY_FAILED';

export const ACCESS_GRANTED = '@ auth / ACCESS_GRANTED';

export const UPDATE_CURRENT_REGISTERED_USER = '@ auth / UPDATE_CURRENT_REGISTERED_USER';
export const UPDATE_CURRENT_USER = '@ auth / UPDATE_CURRENT_USER';
export const UPDATE_CURRENT_USER_SUCCEDED = '@ auth / UPDATE_CURRENT_USER_SUCCEDED';
export const UPDATE_CURRENT_USER_FAILED = '@ auth / UPDATE_CURRENT_USER_FAILED';

export const REFRESH_CURRENT_USER = '@ auth / REFRESH_CURRENT_USER';

export const GET_CURRENT_USER_SUCCEEDED = '@ auth / GET_CURRENT_USER_SUCCEEDED'
export const GET_CURRENT_USER_FAILED = '@ auth / GET_CURRENT_USER_FAILED'


export const logout = () => ({ type: LOGOUT });
export const signup = (payload) => ({ type: SIGNUP, payload });
export const login = (payload) => ({ type: LOGIN, payload });
export const verify = (code) => ({type: VERIFY, payload: { code } })

export const updateCurrentUser = (payload) => ({type: UPDATE_CURRENT_USER, payload}) 
export const updateCurrentRegisteredUser = (payload) => ({type: UPDATE_CURRENT_REGISTERED_USER, payload}) 
export const refresh = () => ({type: REFRESH_CURRENT_USER})

//
// REDUCERS

export const initialState = {
  is_loggedin: undefined,
  is_signup: undefined
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        is_loggedin: true
      }
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        is_loggedin: true,
        user: action.payload.data.undefined.user,
        token: action.payload.data.undefined.token
      };
    case LOGIN_FAILED:
      return {
        ...state,
        is_loggedin: false
      };
    case UPDATE_CURRENT_USER_SUCCEDED:
      return {
        ...state,
        is_signup: true
      };
    case UPDATE_CURRENT_USER_FAILED:
      return {
        ...state,
        is_signup: false
      };
    case GET_CURRENT_USER_SUCCEEDED:
      const user_id = Object.keys(action.payload.data)[0]
      const user = action.payload.data[user_id]
      console.log(action)
      return {
        ...state,
        user
      }
    case LOGOUT:
      clear()

      return {
        is_loggedin: undefined,
        is_signup: undefined
      }
    default:
      return state;
  }
}

//
//  SAGA

export function* saga() {
  yield takeLatest(REHYDRATE, checkAuthentication)
  yield takeLatest(SIGNUP, registerHandler);
  yield takeLatest(LOGIN, loginHandler);
  yield takeLatest(VERIFY, verifyHandler);
  yield takeEvery([LOGIN_SUCCEEDED, IS_AUTHENTICATED], grantAccess);
  yield takeLatest(UPDATE_CURRENT_USER, updateCurrentUserHandler);
  yield takeLatest(UPDATE_CURRENT_REGISTERED_USER, updateCurrentRegisteredUserHandler)
  yield takeLatest([ACCESS_GRANTED, REFRESH_CURRENT_USER], getCurrentUserHanlder);
  yield takeLatest(ACCESS_GRANTED, initalize)
}

function* checkAuthentication() {
  const token = getToken()
  if(token) {
    const payload = {
      data: {
        undefined: {
          token
        }
      }
    }

    yield put({type: IS_AUTHENTICATED, payload})
  }
}

function* grantAccess({ payload }) {
  const token = payload.data.undefined.token
  setToken(token)
  yield call(api.setHeaders, { Authorization: headerFromToken(token) })
  yield put({ type: ACCESS_GRANTED })
}

export function headerFromToken(token) {
  return `JWT ${token}`
}

function* registerHandler({ payload }) {
  const registerURL = api.buildURL('auth', { id: 'signup' });
  yield put(api.create(registerURL, payload));

  const { success } = yield race({
    success: take(api.auth.CREATE_SUCCEEDED),
    failure: take(api.auth.CREATE_FAILED)
  });

  if (success) {
    yield put({ type: SIGNUP_SUCCEEDED, payload: success.payload });
  }
  else {
    yield put({ type: SIGNUP_FAILED });
  }
}

function* loginHandler({ payload }) {
  const loginURL = api.buildURL('auth', { id: 'login' });
  yield put(api.create(loginURL, payload));

  const { success } = yield race({
    success: take(api.auth.CREATE_SUCCEEDED),
    failure: take(api.auth.CREATE_FAILED)
  });

  if (success) {
    yield put({ type: LOGIN_SUCCEEDED, payload: success.payload });
    setCredentials(payload)
  }
  else {
    yield put({ type: LOGIN_FAILED });
  }
}

function* verifyHandler({ payload }) {
  const verifynURL = api.buildURL('auth', { id: 'verify' });
  yield put(api.create(verifynURL, payload));

  const { success } = yield race({
    success: take(api.auth.CREATE_SUCCEEDED),
    failure: take(api.auth.CREATE_FAILED)
  });

  if (success) {
    yield put({ type: VERIFY_SUCCEEDED, payload: success.payload });

    const credentials = getCredentials()
    yield put(login(credentials))
  }
  else {
    yield put({ type: VERIFY_FAILED });
  }
}

function* updateCurrentUserHandler({ payload }) {
  const { address, isCompany, isTargetingCompanies, name, phoneNumber, type} = payload
  if(type == 'Buyer') {
    const payload = {
      first_name: name,
      last_name: name,
      address,
      phone: phoneNumber,
      buyer_type: isCompany ? 'company' : 'private',
    }

    const buyerURL = api.buildURL('buyer', { id: 'me' });
    yield put(api.update(buyerURL, payload));
  } else {
    const payload = {
      name,
      phone: phoneNumber,
      buyer_type: isTargetingCompanies ? 'company' : 'private',
      address
    }

    const sellerURL = api.buildURL('buyer', { id: 'seller' });
    yield put(api.create(sellerURL, payload));
  }

  const { success } = yield race({
    success: take([api.buyer.CREATE_SUCCEEDED, api.buyer.UPDATE_SUCCEEDED]),
    failure: take([api.buyer.CREATE_FAILED, api.buyer.UPDATE_FAILED])
  });

  if (success) {
    yield put({ type: UPDATE_CURRENT_USER_SUCCEDED, payload: success.payload });
  }
  else {
    yield put({ type: UPDATE_CURRENT_USER_FAILED });
  }
}

function* updateCurrentRegisteredUserHandler({ payload }) {
  const { address, name, phoneNumber, isSeller, photo} = payload
  if(!isSeller) {
    const payload = {
      first_name: name,
      last_name: name,
      address,
      phone: phoneNumber,
      photo
    }

    const buyerURL = api.buildURL('buyer', { id: 'me' });
    yield put(api.update(buyerURL, payload));
  } else {
    const payload = {
      name,
      phone: phoneNumber,
      address,
      photo
    }

    const sellerURL = api.buildURL('buyer', { id: 'seller' });
    yield put(api.update(sellerURL, payload));
  }

  const { success } = yield race({
    success: take(api.buyer.UPDATE_SUCCEEDED),
    failure: take(api.buyer.UPDATE_FAILED)
  });

  if (success) {
    yield put({ type: UPDATE_CURRENT_USER_SUCCEDED, payload: success.payload });
  }
  else {
    yield put({ type: UPDATE_CURRENT_USER_FAILED });
  }
}

function* getCurrentUserHanlder() {
  const getUserUrl = api.buildURL('buyer', { id: 'me' });
  yield put(api.get(getUserUrl));

  const { success } = yield race({
    success: take(api.buyer.GET_SUCCEEDED),
    failure: take(api.buyer.GET_FAILED)
  });

  if (success) {
    yield put({ type: GET_CURRENT_USER_SUCCEEDED, payload: success.payload });
  }
  else {
    yield put({ type: GET_CURRENT_USER_FAILED });
  }

  const shopURL = api.buildURL('buyer', { id: 'shop-cart' });
    yield put(api.get(shopURL));

  const { success1 } = yield race({
    success1: take(api.buyer.GET_SUCCEEDED),
    failure: take(api.buyer.GET_FAILED)
  });

  if(success1) {
      yield put({type: shops.GET_CART_SUCCEEDED, payload: success1.payload})
  }
}

function* initalize() {
  Geocode.setApiKey('AIzaSyDpX55p7sSCdvPgNXplw835klLKJPydUT4')

  const getUserUrl = api.buildURL('buyer', { id: 'shop-cart' });
  yield put(api.create(getUserUrl));
  yield put(shops.getCart())
}

//
// Selectors

export const getState = (state) => (state.auth)
export const getTokenFromState = createSelector(
    getState,
    (state) => state.token
)
export const getCurrentUser = createSelector(
  getState,
  (state) => state.user
)
export const isLoggedIn = createSelector(
  getState,
  (state) => state.is_loggedin
)
export const isSignUp = createSelector(
  getState,
  (state) => state.is_signup
)
