import * as PostsAPI from '../utils/PostsAPI';
import { createAsyncAction } from '../utils/ActionHelper';

/* --- Action types --- */
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

/* --- Action creators --- */
export function fetchCategories () {
  return createAsyncAction(
    FETCH_CATEGORIES,
    PostsAPI.getCategories()
  );
}
