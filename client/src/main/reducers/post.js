import {
  FETCH_POSTS,
  DELETE_POST,
  UPDATE_POST_SCORE,
  SORT_POST_LIST,
  FILTER_POSTS_BY_CATEGORY,
  FETCH_POST_DATA,
  CREATE_POST,
  EDIT_POST,
  SET_ACTIVE_POST,
  UNSET_ACTIVE_POST
} from '../actions/post';

/* --- Posts reducer --- */

// TODO: we should have post list and individual posts being edited / viewed in different properties or stores

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
      sortPostsByProperty(updatedState, 'voteScore');
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
      sortPostsByProperty(updatedState, action.criteria);
      break;
    case FILTER_POSTS_BY_CATEGORY:
      console.log(`Showing ${action.response.length} posts for category ${action.category}...`);
      updatedState = action.status === 'success' ? action.response: [];
      sortPostsByProperty(updatedState, 'voteScore');
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

// Sort posts by a certain property (descending order, highest first)
function sortPostsByProperty (posts, property) {
  console.log(`Sorting by ${property}...`);

  return posts.sort((a, b) => {
    if (a[property] > b[property]) {
      return -1;
    } else if (a[property] < b[property]) {
      return 1;
    } else {
      return 0;
    }
  });
}

export default posts;

export function activePostReducer (state = null, action) {

  switch (action.type) {
    case CREATE_POST:
    case FETCH_POST_DATA:
    case UPDATE_POST_SCORE:
      return (action.status === 'success') ? action.response : null;
    case SET_ACTIVE_POST:
      return action.post;
    case UNSET_ACTIVE_POST:
      return null;
    default:
      console.debug(`<ActivePostReducer> Unknown action ${action.type}`);
  }

  return state;
}
