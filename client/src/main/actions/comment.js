import * as PostsAPI from '../utils/PostsAPI';

/* --- Action types --- */
export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT';

/* --- Action creators --- */
export function fetchCommentsForPost({ status = null, response = null, post }) {

  if (status === 'success' || status === 'error') {
    return {
      type: FETCH_COMMENTS_FOR_POST,
      status,
      response,
      post
    };
  }

  return (dispatch) => {
    PostsAPI.getPostComments(post)
      .then((comments) => {
        console.log(`${comments.length} comments found for post ${post.id}`);
        dispatch(fetchCommentsForPost({ status: 'success', response: comments, post }));
      })
      .catch((error) => dispatch(fetchCommentsForPost({ status: 'error', response: error, post })));
  };
}

export function postNewComment({ status = null, response = null, post, comment }) {

  if (status === 'success' || status === 'error') {
    return {
      type: POST_NEW_COMMENT,
      status,
      response
    };
  }

  return (dispatch) => {
    PostsAPI.postComment(post, comment)
      .then((comment) => {
        console.log(`Comment ${comment.id} added in post ${post.id}`);
        dispatch(postNewComment({ status: 'success', response: comment }));
      })
      .catch((error) => dispatch(postNewComment({ status: 'error', response: error })));
  };
}
