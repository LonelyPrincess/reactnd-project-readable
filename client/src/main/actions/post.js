import * as PostsAPI from '../utils/PostsAPI';

/* --- Action types --- */
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';

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

export function createPost ({ title, author, body, category }) {
  return {
    type: CREATE_POST,
    title,
    author,
    body,
    category
  };
}

export function updatePostScore ({ postId, voteType }) {
  return {
    type: UPDATE_POST_SCORE,
    postId: postId,
    voteType
  };
}