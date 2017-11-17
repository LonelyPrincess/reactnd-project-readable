import {
  FETCH_COMMENTS_FOR_POST,
  POST_NEW_COMMENT,
  UPDATE_COMMENT_SCORE,
  DELETE_COMMENT,
  EDIT_COMMENT
} from '../actions/comment';

/* --- Categories reducer --- */

// Default initial state
const initialState = [];

// If state is undefined, it will receive initialState by default
function comments (state = initialState, action) {

  let updatedState = state.slice();

  let commentIndex;

  switch (action.type) {
    case FETCH_COMMENTS_FOR_POST:
      updatedState = action.status === 'success' ? action.response: [];
      updatedState.sort(compareScore);
      break;
    case POST_NEW_COMMENT:
      updatedState.push(action.response);
      updatedState.sort(compareScore);
      break;
    case UPDATE_COMMENT_SCORE:
      console.log(`Updating score for comment ${action.response.id}`);
      commentIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[commentIndex] = {
        ...updatedState[commentIndex],
        voteScore: action.response.voteScore
      };
      updatedState.sort(compareScore);
      break;
    case DELETE_COMMENT:
      console.log(`Comment ${action.response.id} removed`);
      updatedState = updatedState
        .filter((comment) => comment.id !== action.response.id);
      break;
    case EDIT_COMMENT:
      console.log(`Comment ${action.response.id} updated`);
      commentIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[commentIndex] = {
        ...action.response
      };
      break;
    default:
      console.debug(`<CommentReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

function compareScore (a, b) {
  if (a['voteScore'] > b['voteScore']) {
    return -1;
  } else if (a['voteScore'] < b['voteScore']) {
    return 1;
  } else {
    return 0;
  }
}

export default comments;
