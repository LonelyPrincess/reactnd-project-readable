import {
  FETCH_POSTS,
  CREATE_POST,
  UPDATE_POST_SCORE
} from '../actions/post';

/* --- Posts reducer --- */

// Default initial state
const initialPostState = [];

// If state is undefined, it will receive initialState by default
function posts (state = initialPostState, action) {

  let updatedState = state.slice();

  switch (action.type) {
    case FETCH_POSTS:
      state = action.status === 'success' ? action.response: [];
      break;
    case CREATE_POST:
      state.push({ title, author, body, category });
      break;
    case UPDATE_POST_SCORE:
      let postIndex = updatedState.findIndex((item) => item.id === action.response.id);
      updatedState[postIndex].voteScore = action.response.voteScore;
      break;
    default:
      console.warn(`Unknown action ${action.type}`);
  }

  return updatedState;
}

export default posts;