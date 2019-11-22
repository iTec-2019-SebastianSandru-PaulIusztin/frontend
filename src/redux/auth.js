import { takeLatest, put, delay, race, take } from 'redux-saga/effects';

import { api } from '../redux';

//
// ACTIONS

export const LOGOUT = '@ auth / LOGOUT';

export const LOGIN_SUCCEEDED = '@ auth / LOGIN_SUCCEEDED';
export const LOGIN_FAILED = '@ auth / LOGIN_FAILED';

export const SIGNUP_SUCCEEDED = '@ auth / SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = '@ auth / SIGNUP_FAILED';

export const logout = () => ({ type: LOGOUT });

//
// REDUCERS

export const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

//
//  SAGA

export function* saga() {
  yield takeLatest(LOGOUT, logoutHandler);
}

function* logoutHandler() {
  // TODO: TESST CODE: DELETE ME
  // thanks
  //
  // const profileURL = api.buildURL('users', { id: 'me' })
  // yield put(api.get(profileURL))

  // const { success } = yield race({
  //     success : take(api.users.GET_SUCCEEDED),
  //     failure : take(api.users.GET_FAILED)
  // })

  // success ? console.log('SUCCESS') : console.log('FAILURE')

  yield delay(1000);
  yield put(logout());
}
