import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const SORT_POST_LIST = 'SORT_POST_LIST';
export const FILTER_POSTS_BY_CATEGORY = 'FILTER_POSTS_BY_CATEGORY';
export const FETCH_POST_DATA = 'FETCH_POST_DATA';

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

export function fetchPostsFromCategory ({ category }) {
  return createAsyncAction(
    FILTER_POSTS_BY_CATEGORY,
    PostsAPI.getFromCategory(category),
    { category }
  );
}

export function fetchPostData ({ postId }) {
  return createAsyncAction(
    FETCH_POST_DATA,
    PostsAPI.get(postId),
    { postId }
  );
}
