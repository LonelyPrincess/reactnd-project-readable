import {
  FETCH_CATEGORIES,
  SET_ACTIVE_CATEGORY
} from '../actions/category';

/* --- Category list reducer --- */
export function categories (state = [], action) {

  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.status === 'success' ? action.response.sort() : [];
    default:
      console.debug(`<CategoryReducer> Unknown action ${action.type}`);
  }

  return state;
}

/* --- Active category reducer --- */
export function activeCategory (state = null, action) {

  switch (action.type) {
    case SET_ACTIVE_CATEGORY:
      return action.categoryId || null;
    default:
      console.debug(`<ActiveCategoryReducer> Unknown action ${action.type}`);
  }

  return state;
}

/* Export a single object containing all category related reducers */
export default {
  categories,
  activeCategory
};
