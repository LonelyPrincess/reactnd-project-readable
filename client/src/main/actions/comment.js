import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_COMMENTS_FOR_POST = 'FETCH_COMMENTS_FOR_POST';
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const SET_ACTIVE_COMMENT = 'SET_ACTIVE_COMMENT';

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

export function updateCommentScore ({ comment, voteType }) {
  return createAsyncAction(
    UPDATE_COMMENT_SCORE,
    PostsAPI.updateCommentScore(comment, voteType)
  );
}

export function deleteComment ({ comment }) {
  return createAsyncAction(
    DELETE_COMMENT,
    PostsAPI.deleteComment(comment)
  );
}

export function editComment ({ comment }) {
  return createAsyncAction(
    EDIT_COMMENT,
    PostsAPI.editComment(comment)
  );
}

export function setActiveComment (comment) {
  return {
    type: SET_ACTIVE_COMMENT,
    comment
  };
}
