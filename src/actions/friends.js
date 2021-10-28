import { APIUrls } from '../helper/urls';
import { getToken } from '../helper/utils';
import { FETCH_FRIEND_SUCCESSFUL } from './actionsTypes';

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
          console.log('user friends', data.data.friends);
          dispatch(fetchUserFriendSuccess(data.data.friends));
          return;
        }
      })
      .catch((err) => {
        console.log(err);
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
