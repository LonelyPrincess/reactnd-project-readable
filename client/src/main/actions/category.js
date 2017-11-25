import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';

/* --- Action creators --- */
export function fetchCategories () {
  return createAsyncAction(
    FETCH_CATEGORIES,
    PostsAPI.getCategories()
  );
}

export function setActiveCategory ({ category }) {
  return {
    type: SET_ACTIVE_CATEGORY,
    categoryId: category ? category.path : null
  };
}
