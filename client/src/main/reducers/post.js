import {
  FETCH_POSTS,
  DELETE_POST,
  UPDATE_POST_SCORE,
  SORT_POST_LIST,
  FETCH_POST_DATA,
  CREATE_POST,
  EDIT_POST
} from '../actions/post';

import { sortByObjectProperty } from '../utils/Utils';

/* --- Post list reducer --- */
function posts (state = [], action) {

  // Create a copy of the state to ensure we're not modifying the original
  let updatedState = state.slice();

  let postIndex;

  switch (action.type) {
    case FETCH_POSTS:
      updatedState = action.status === 'success' ? action.response: [];
      sortByObjectProperty(updatedState, 'voteScore');
      break;
    case SORT_POST_LIST:
      sortByObjectProperty(updatedState, action.criteria);
      break;
    case FETCH_POST_DATA:
      updatedState = [];
      if (action.status === 'success') {
        updatedState.push(action.response);
      }
      break;
    case CREATE_POST:
      console.log(`Created post with id ${action.response.id}`);
      if (action.status === 'success') {
        updatedState.push(action.response);
      }
      break;
    case EDIT_POST:
    case UPDATE_POST_SCORE:
      console.log(`Post ${action.response.id} updated`);
      postIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[postIndex] = {
        ...action.response
      };
      break;
    case DELETE_POST:
      postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState.splice(postIndex, 1);
      break;
    default:
      console.debug(`<PostReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

/* --- Active post reducer --- */
export function activePost (state = null, action) {

  switch (action.type) {
    case CREATE_POST:
    case FETCH_POST_DATA:
    case UPDATE_POST_SCORE:
      return (action.status === 'success') ? action.response : null;
    default:
      console.debug(`<ActivePostReducer> Unknown action ${action.type}`);
  }

  return state;
}

/* --- Active post sort criteria reducer --- */
export function activeSortCriteria (state = 'voteScore', action) {

  switch (action.type) {
    case SORT_POST_LIST:
      return action.criteria;
    default:
      console.debug(`<ActiveSortCriteriaReducer> Unknown action ${action.type}`);
  }

  return state;
}

/* Export a single object containing all post related reducers */
export default {
  posts,
  activePost,
  activeSortCriteria
};
