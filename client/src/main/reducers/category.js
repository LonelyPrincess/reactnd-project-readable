import {
  FETCH_CATEGORIES,
  SET_ACTIVE_CATEGORY
} from '../actions/category';

/* --- Categories reducer --- */

// Default initial state
const initialState = {
  list: [],
  active: null,
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
          list: action.status === 'success' ? action.response.sort() : []
        };
      }
      break;
    case SET_ACTIVE_CATEGORY:
      updatedState = {
        ...state,
        active: action.categoryId
      };
      break;
    default:
      console.debug(`<CategoryReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

export default categories;
