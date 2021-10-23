import { APIUrls } from '../helper/urls';
import { UPDATE_POST } from './actionsTypes';

export function fetchpost() {
  return (dispatch) => {
    // console.log(url);
    const url = APIUrls.getPost();
    // console.log(url);
    fetch(url).then((res) => {
      return res
        .json()
        .then((data) => {
          // console.log(data);
          dispatch(updatePost(data.data.posts));
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    });
  };
}

export function updatePost(posts) {
  return {
    type: UPDATE_POST,
    posts,
  };
}
