import {
  ADD_USER_FRIEND,
  FETCH_FRIEND_SUCCESSFUL,
  REMOVE_FRIEND,
} from '../actions/actionsTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESSFUL: {
      return [...action.friends];
    }
    case ADD_USER_FRIEND:
      return state.concat(action.friendship);

    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return newArr;

    default:
      return state;
  }
}
