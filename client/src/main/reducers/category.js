import {
  FETCH_CATEGORIES
} from '../actions/category';

/* --- Categories reducer --- */

// Default initial state
const initialState = {
  categories: [],
  isLoading: false,
  expirationDate: null
};

// If state is undefined, it will receive initialState by default
function categories (state = initialState, action) {

  let currentDate = new Date();

  let updatedState = {
    ...state,
    isLoading: false,
    expirationDate: currentDate.setMinutes(currentDate.getMinutes() + 30)
  };

  switch (action.type) {
    case FETCH_CATEGORIES:
      if (action.isFetching) {
        updatedState = {
          ...state,
          isLoading: true
        }
      } else {
        updatedState = {
          ...updatedState,
          categories: action.status === 'success' ? action.response.sort() : []
        };
      }
      break;
    default:
      console.debug(`<CategoryReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

export default categories;
