import {
  ADD_USER_FRIEND,
  FETCH_FRIEND_SUCCESSFUL,
} from '../actions/actionsTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESSFUL: {
      return [...action.friends];
    }
    case ADD_USER_FRIEND:
      return state.concat(action.friendship);

    default:
      return state;
  }
}
