import { takeLatest, put, delay, race, take } from 'redux-saga/effects';

import { api } from '../redux';

//
// ACTIONS

export const LOGOUT = '@ auth / LOGOUT';
export const SIGNUP = ' @ auth / SIGNUP';
export const LOGIN = ' @ auth / LOGIN';

export const LOGIN_SUCCEEDED = '@ auth / LOGIN_SUCCEEDED';
export const LOGIN_FAILED = '@ auth / LOGIN_FAILED';

export const SIGNUP_SUCCEEDED = '@ auth / SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = '@ auth / SIGNUP_FAILED';

export const logout = () => ({ type: LOGOUT });
export const signup = (payload) => ({ type: SIGNUP, payload });
export const login = (payload) => ({ type: LOGIN, payload });

//
// REDUCERS

export const initialState = {
  is_loggedin: undefined,
  is_signup: undefined
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
    case SIGNUP_SUCCEEDED:
      return {
        ...state,
        is_signup: true
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        is_signup: false
      };
    default:
      return state;
  }
}

//
//  SAGA

export function* saga() {
  yield takeLatest(SIGNUP, registerHandler);
  yield takeLatest(LOGIN, loginHandler);
}

function* registerHandler({ payload }) {
  const registerURL = api.buildURL('auth', { id: 'signup' });
  yield put(api.post(registerURL, payload));

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
  }
  else {
    yield put({ type: LOGIN_FAILED });
  }
}
