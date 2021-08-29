import { UPDATE_POST } from '../actions/actionsTypes';

// const initialState = {
//   posts: ['hehehehe'],
//   users: {
//     name: 'amit',
//   },
// };

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POST:
      return action.posts;
    default:
      return state;
  }
}
