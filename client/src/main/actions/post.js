import * as PostsAPI from '../utils/PostsAPI';

/* --- Action types --- */
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const SORT_POST_LIST = 'SORT_POST_LIST';

/* --- Action creators --- */
export function fetchPosts ({ status, response } = {}) {

  if (status === 'success' || status === 'error') {
    return {
      type: FETCH_POSTS,
      status,
      response
    };
  }

  return (dispatch) => {
    PostsAPI.getAll()
      .then((posts) => {
        console.log(`${posts.length} posts found`);
        dispatch(fetchPosts({ status: 'success', response: posts }));
      })
      .catch((error) => dispatch(fetchPosts({ status: 'error', response: error })));
  };
}

export function updatePostScore ({ status = null, response = null, post, voteType } = {}) {

  if (status === 'success' || status === 'error') {
    return {
      type: UPDATE_POST_SCORE,
      status,
      response,
      voteType
    };
  }

  return (dispatch) => {
    PostsAPI.vote(post, voteType)
      .then((post) => {
        console.log(`${post.id} has an score of ${post.voteScore}`);
        dispatch(updatePostScore({ status: 'success', response: post }));
      })
      .catch((error) => dispatch(updatePostScore({ status: 'error', response: error })));
  };
}

export function deletePost ({ status = null, response = null, post } = {}) {

  if (status === 'success' || status === 'error') {
    return {
      type: DELETE_POST,
      status,
      response
    };
  }

  return (dispatch) => {
    PostsAPI.remove(post)
      .then((post) => {
        console.log(`${post.id} has been removed`);
        dispatch(deletePost({ status: 'success', response: post }));
      })
      .catch((error) => dispatch(deletePost({ status: 'error', response: error })));
  };
}

export function sortPostsBy ({ criteria }) {
  return {
    type: SORT_POST_LIST,
    criteria
  };
}

// TODO: refactor this file! we could search for a way to extract common code
// for async actions to a new generic method that can be reused later

// TODO: the status field must be kept, but 'response' could have a name that
// applies better to each case. This will make our reducer easier to maintain,
// because right now, 'response' can contain a list of posts, an error or
// whatever. So, what we may do instead is:
//
//  - If the promise is rejected, use an 'error' property to store its info
//  - Response for 'fetchPosts' may be stored in a 'posts' property when the action
//   succeeds.
//  - Response for 'updatePostScore' is a single post, so store it in 'post'.
