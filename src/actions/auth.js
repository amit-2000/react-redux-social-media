import { APIUrls } from '../helper/urls';
import { getFormBody } from '../helper/utils';
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
//   CLEAR_AUTH_STATE,
} from './actionsTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  const url = APIUrls.login();
  startLogin();
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
        dispatch(loginSucccess());
        console.log(data);
        return;
      })
      .catch((err) => {
        dispatch(loginFail(err.message));
        console.log(err);
        return;
      });
  };
}
export function loginSucccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginFail(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

// register user
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signUp();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          // do something
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccessful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSingup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
