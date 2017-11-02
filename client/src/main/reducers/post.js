import {
  FETCH_POSTS,
  DELETE_POST,
  UPDATE_POST_SCORE
} from '../actions/post';

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
      break;
    case DELETE_POST:
      postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState.splice(postIndex, 1);
      break;
    case UPDATE_POST_SCORE:
      postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState[postIndex].voteScore = action.response.voteScore;
      break;
    default:
      console.warn(`Unknown action ${action.type}`);
  }

  return updatedState;
}

export default posts;
