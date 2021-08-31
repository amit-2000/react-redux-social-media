import { APIUrls } from '../helper/urls';
import { getFormBody } from '../helper/utils';
import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionsTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  const url = APIUrls.login();
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      // sending data in urls header.
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(loginSucccess(data.data.user));
        console.log(data);
        return;
      })
      .catch((err) => {
        dispatch(loginFail(err.message));
        return;
      });
  };
}
export function loginSucccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
