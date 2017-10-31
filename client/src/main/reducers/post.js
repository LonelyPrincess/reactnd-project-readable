import {
  CREATE_POST,
  UPDATE_POST_SCORE
} from '../actions/post';

/* --- Posts reducer --- */

// Default initial state
const initialPostState = [];

// If state is undefined, it will receive initialState by default
function posts (state = initialPostState, action) {
  const { title, author, body, category } = action;

  switch (action.type) {
    case CREATE_POST:
      state.push({ title, author, body, category });
      return state;
    case UPDATE_POST_SCORE:
      let postIndex = state.findIndex((item) => item.id === action.postId);
      state[postIndex] += (state.voteType === "upVote" ? 1 : -1);
      return state;
    default:
      return state;
  }
}

export default posts;