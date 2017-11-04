import * as PostsAPI from '../utils/PostsAPI';

/* --- Action types --- */
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

/* --- Action creators --- */
export function fetchCategories ({ status, response } = {}) {

  if (status === 'success' || status === 'error') {
    return {
      type: FETCH_CATEGORIES,
      status,
      response
    };
  }

  return (dispatch) => {
    PostsAPI.getCategories()
      .then((categories) => {
        console.log(`${categories.length} categories found`);
        dispatch(fetchCategories({ status: 'success', response: categories }));
      })
      .catch((error) => dispatch(fetchCategories({ status: 'error', response: error })));
  };
}
