import {
  FETCH_COMMENTS_FOR_POST,
  POST_NEW_COMMENT,
  UPDATE_COMMENT_SCORE
} from '../actions/comment';

/* --- Categories reducer --- */

// Default initial state
const initialState = [];

// If state is undefined, it will receive initialState by default
function comments (state = initialState, action) {

  let updatedState = state.slice();

  switch (action.type) {
    case FETCH_COMMENTS_FOR_POST:
      updatedState = action.status === 'success' ? action.response: [];
      updatedState.sort((a, b) => {
        if (a['voteScore'] > b['voteScore']) {
          return -1;
        } else if (a['voteScore'] < b['voteScore']) {
          return 1;
        } else {
          return 0;
        }
      });
      break;
    case POST_NEW_COMMENT:
      updatedState.push(action.response);
      break;
    case UPDATE_COMMENT_SCORE:
      console.log("updating score for comment " + action.response.id);
      let commentIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[commentIndex] = {
        ...updatedState[commentIndex],
        voteScore: action.response.voteScore
      };
      break;
    default:
      console.debug(`<CommentReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

export default comments;
