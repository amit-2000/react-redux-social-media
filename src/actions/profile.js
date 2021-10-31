import { APIUrls } from '../helper/urls';
import { getToken } from '../helper/utils';
import {
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE,
} from './actionsTypes';

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIUrls.userProile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
          if (data.success) {
            // console.log('Data', data);
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatch(userProfileFail(err.message));
        return;
      });
  };
}

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFail(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}
