import { APIUrls } from '../helper/urls';
import { getFormBody, getToken } from '../helper/utils';
import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  SIGNUP_START,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  PERSIST_USER,
  LOGOUT_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESSFUL,
  //   CLEAR_AUTH_STATE,
} from './actionsTypes';
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function login(email, password) {
  const url = APIUrls.login();
  return (dispatch) => {
    dispatch(startLogin());
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
        if (data.success) {
          localStorage.setItem('token', data.data.token); //got token and store it in localstorage so everytime we refresh it stay in browser ||
          // console.log('token', data);
          dispatch(loginSucccess(data.data.user));
          return;
        } else {
          // console.log('data', data.message);
          dispatch(loginFail(data.message));
          return;
        }
      })
      .catch((err) => {
        dispatch(loginFail(err.message));
        // console.log(err);
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

// register user
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function signup(email, password, confirmPassword, name) {
  // console.log('hellooooo');

  return (dispatch) => {
    const url = APIUrls.signUp(); // i have api.
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
        // console.log('data', data);
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

//persisting user
export function persistUser(user) {
  return {
    type: PERSIST_USER,
    user,
  };
}

// export function logoutUser(userToken) {
//   return (dispatch) => {
//     localStorage.removeItem(userToken);
//     dispatch(logout());
//     return;
//   };
// }

// logout user
export function logout() {
  return {
    type: LOGOUT_USER,
  };
}
// Clear Auth state.

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUser(name, password, confirm_password, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getToken()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password,
        id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('EDIT_PROFILE_DATA', data.data.user);
        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }
        dispatch(editUserFail(data.message));
      });
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}
export function editUserFail(error) {
  return {
    type: EDIT_USER_FAIL,
    error,
  };
}


