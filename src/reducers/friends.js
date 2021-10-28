import { FETCH_FRIEND_SUCCESSFUL } from '../actions/actionsTypes';

const defaultProfileState = [];

export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIEND_SUCCESSFUL: { 
      return [...action.friends];
    }
    default:
      return state;
  }
}
