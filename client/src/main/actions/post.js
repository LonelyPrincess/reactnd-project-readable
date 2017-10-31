export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';

/* --- Action creators --- */
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