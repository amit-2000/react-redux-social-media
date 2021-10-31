import { APIUrls } from '../helper/urls';
import { getToken } from '../helper/utils';
import {
  ADD_USER_FRIEND,
  FETCH_FRIEND_SUCCESSFUL,
  FIREND_ADD_FAIL,
  FRIEND_ADDED_SUCESSFULLY,
  REMOVE_FRIEND,
} from './actionsTypes';

export function fetchUserFriend(userId) {
  return (dispatch) => {
    const url = APIUrls.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log('user friends', data.data.friends);
          dispatch(fetchUserFriendSuccess(data.data.friends));
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
        return;
      });
  };
}

export function fetchUserFriendSuccess(friends) {
  return {
    type: FETCH_FRIEND_SUCCESSFUL,
    friends,
  };
}

export function AddFriendSuccess(friendship) {
  return {
    type: ADD_USER_FRIEND,
    friendship,
  };
}

export function failToAddFriend(error) {
  return {
    type: FIREND_ADD_FAIL,
    error,
  };
}

export function removeFriendSuccessfully(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
