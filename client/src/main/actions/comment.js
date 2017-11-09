import * as PostsAPI from '../utils/PostsAPI';

/* --- Action types --- */
export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';

/* --- Action creators --- */
export function fetchCommentsForPost ({ status = null, response = null, post }) {

  if (status === 'success' || status === 'error') {
    return {
      type: FETCH_COMMENTS_FOR_POST,
      status,
      response
    };
  }

  return (dispatch) => {
    PostsAPI.getPostComments(post)
      .then((comments) => {
        console.log(`${comments.length} comments found for post ${post.id}`);
        dispatch(fetchCommentsForPost({ status: 'success', response: comments }));
      })
      .catch((error) => dispatch(fetchCommentsForPost({ status: 'error', response: error })));
  };
}
