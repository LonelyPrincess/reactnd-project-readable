import {
  FETCH_POSTS,
  DELETE_POST,
  UPDATE_POST_SCORE,
  SORT_POST_LIST,
  FILTER_POSTS_BY_CATEGORY, // TODO: not needed
  FETCH_POST_DATA,          // TODO: not needed
  CREATE_POST,
  EDIT_POST
} from '../actions/post';

import { sortByObjectProperty } from '../utils/Utils';

/* --- Posts reducer --- */

// Default initial state
const initialPostState = [];

// If state is undefined, it will receive initialState by default
function posts (state = initialPostState, action) {

  // NOTE: We must ensure we're not updating the current state variable!!
  // If we override the current variable instead of returning a new instance,
  // connected components will not re-render
  let updatedState = state.slice();

  let postIndex;

  switch (action.type) {
    case FETCH_POSTS:
      updatedState = action.status === 'success' ? action.response: [];
      sortByObjectProperty(updatedState, 'voteScore');
      break;
    case DELETE_POST:
      postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState.splice(postIndex, 1);
      break;
    case UPDATE_POST_SCORE:
      postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState[postIndex] = {
        ...updatedState[postIndex],
        voteScore: action.response.voteScore
      };
      break;
    case SORT_POST_LIST:
      sortByObjectProperty(updatedState, action.criteria);
      break;
    case FILTER_POSTS_BY_CATEGORY:
      console.log(`Showing ${action.response.length} posts for category ${action.category}...`);
      updatedState = action.status === 'success' ? action.response: [];
      sortByObjectProperty(updatedState, 'voteScore');
      break;
    case FETCH_POST_DATA:
      updatedState = [];
      if (action.status === 'success') {
        updatedState.push(action.response);
      }
      break;
    case CREATE_POST:
      console.log(`Created post with id ${action.response.id}`);
      postIndex = [];
      if (action.status === 'success') {
        updatedState.push(action.response);
      }
      break;
    case EDIT_POST:
      console.log(`Post ${action.response.id} updated`);
      postIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[postIndex] = {
        ...action.response
      };
      break;
    default:
      console.debug(`<PostReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

export default posts;

export function activePostReducer (state = null, action) {

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

export function activeSortCriteriaReducer (state = 'voteScore', action) {

  switch (action.type) {
    case SORT_POST_LIST:
      return action.criteria;
    default:
      console.debug(`<ActiveSortCriteriaReducer> Unknown action ${action.type}`);
  }

  return state;
}