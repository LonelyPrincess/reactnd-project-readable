import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const SORT_POST_LIST = 'SORT_POST_LIST';
export const FETCH_POST_DATA = 'FETCH_POST_DATA';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';

/* --- Action creators --- */
export function fetchPosts () {
  return createAsyncAction(
    FETCH_POSTS,
    PostsAPI.getAll()
  );
}

export function updatePostScore ({ post, voteType }) {
  return createAsyncAction(
    UPDATE_POST_SCORE,
    PostsAPI.vote(post, voteType),
    { post, voteType }
  );
}

export function deletePost ({ post }) {
  return createAsyncAction(
    DELETE_POST,
    PostsAPI.remove(post),
    { post }
  );
}

export function sortPostsBy ({ criteria }) {
  return {
    type: SORT_POST_LIST,
    criteria
  };
}

export function fetchPostData ({ postId }) {
  return createAsyncAction(
    FETCH_POST_DATA,
    PostsAPI.get(postId),
    { postId }
  );
}

export function createPost ({ title, body, author, category }) {
  return createAsyncAction(
    CREATE_POST,
    PostsAPI.createPost({ title, body, author, category })
  );
}

export function editPost ({ id, title, body }) {
  return createAsyncAction(
    EDIT_POST,
    PostsAPI.editPost({ id, title, body })
  );
}
