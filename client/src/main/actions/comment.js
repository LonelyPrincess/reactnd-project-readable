import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT';

/* --- Action creators --- */
export function fetchCommentsForPost ({ post }) {
  return createAsyncAction(
    FETCH_COMMENTS_FOR_POST,
    PostsAPI.getPostComments(post),
    { post }
  );
}

export function postNewComment ({ post, comment }) {
  return createAsyncAction(
    POST_NEW_COMMENT,
    PostsAPI.postComment(post, comment),
    { post, comment }
  );
}
