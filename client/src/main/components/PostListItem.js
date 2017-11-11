import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as PostActions from '../actions/post';

/**
 * Stateless component that contains information on a post (excluding comments).
 *
 * @module components/PostListItem
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.post - Post to display.
 */
function PostListItem (props) {

  const { post, actions } = props;

  return (
    <article className="post">
      <div className={`score-box ${(post.voteScore > 0 && 'positive') || (post.voteScore < 0 && 'negative')}`}>
        <div className="icon"></div>
        <div className="score">{post.voteScore}</div>
      </div>

      <h2>{post.title}</h2>
      <small>Posted by <em>{post.author}</em> on {new Date(post.timestamp).toLocaleString()} · {post.commentCount} comments</small>
      <main className="post-body">{post.body}</main>

      <div className="actions">
        <button onClick={() => actions.updatePostScore(post, 'upVote')}>Upvote</button>
        <button onClick={() => actions.updatePostScore(post, 'downVote')}>Downvote</button>
        <button onClick={() => actions.deletePost(post)}>Delete</button>
      </div>
    </article>
  );
};

PostListItem.propTypes = {
  post: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deletePost: (post) => dispatch(PostActions.deletePost({ post })),
      updatePostScore: (post, voteType) => dispatch(PostActions.updatePostScore({ post, voteType }))
    }
  };
}

export default connect(null, mapDispatchToProps)(PostListItem);
