import {
  FETCH_COMMENTS_FOR_POST,
  POST_NEW_COMMENT,
  UPDATE_COMMENT_SCORE,
  DELETE_COMMENT,
  EDIT_COMMENT,
  SET_ACTIVE_COMMENT
} from '../actions/comment';

import { sortByObjectProperty } from '../utils/Utils';

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
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
      break;
    case POST_NEW_COMMENT:
      updatedState.push(action.response);
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
      break;
    case UPDATE_COMMENT_SCORE:
      console.log(`Updating score for comment ${action.response.id}`);
      commentIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[commentIndex] = {
        ...updatedState[commentIndex],
        voteScore: action.response.voteScore
      };
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
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

export default comments;


export function activeCommentReducer (state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_COMMENT:
      return action.comment ? action.comment.id : null;
    default:
      console.debug(`<ActiveCommentReducer> Unknown action ${action.type}`);
  }

  return state;
}