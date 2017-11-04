import {
  FETCH_CATEGORIES
} from '../actions/category';

/* --- Categories reducer --- */

// Default initial state
const initialState = [];

// If state is undefined, it will receive initialState by default
function categories (state = initialState, action) {

  let updatedState = state.slice();

  switch (action.type) {
    case FETCH_CATEGORIES:
      updatedState = action.status === 'success' ? action.response: [];
      updatedState.sort();
      break;
    default:
      console.warn(`<CategoryReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

export default categories;
