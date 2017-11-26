import {
  FETCH_COMMENTS_FOR_POST,
  POST_NEW_COMMENT,
  UPDATE_COMMENT_SCORE,
  DELETE_COMMENT,
  EDIT_COMMENT,
  SET_ACTIVE_COMMENT
} from '../actions/comment';

import { sortByObjectProperty } from '../utils/Utils';

/* --- Comment list reducer --- */
export function comments (state = [], action) {
  let updatedState = state.slice();

  switch (action.type) {
    case FETCH_COMMENTS_FOR_POST:
      updatedState = action.status === 'success' ? action.response: [];
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
      break;
    case POST_NEW_COMMENT:
      console.log(`Added new comment ${action.response.id}`);
      updatedState.push(action.response);
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
      break;
    case UPDATE_COMMENT_SCORE:
    case EDIT_COMMENT:
      console.log(`Comment ${action.response.id} updated`);
      let commentIndex = updatedState.findIndex(item => item.id === action.response.id);
      updatedState[commentIndex] = {
        ...action.response
      };
      updatedState = sortByObjectProperty(updatedState, 'voteScore');
      break;
    case DELETE_COMMENT:
      console.log(`Comment ${action.response.id} removed`);
      updatedState = updatedState
        .filter((comment) => comment.id !== action.response.id);
      break;
    default:
      console.debug(`<CommentReducer> Unknown action ${action.type}`);
  }

  return updatedState;
}

/* --- Active comment reducer --- */
export function activeComment (state = null, action) {
  switch (action.type) {
    case SET_ACTIVE_COMMENT:
      return action.comment ? action.comment : null;
    default:
      console.debug(`<ActiveCommentReducer> Unknown action ${action.type}`);
  }

  return state;
}

/* --- Export both by default --- */
export default {
  comments,
  activeComment
};
