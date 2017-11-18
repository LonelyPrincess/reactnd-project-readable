import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

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

  // TODO: post details shouldn't use this!!! edit and remove buttons should only appear in details
  return (
    <article className="post">
      <div className={`score-box ${(post.voteScore > 0 && 'positive') || (post.voteScore < 0 && 'negative')}`}>
        <div className="icon"></div>
        <div className="score">{post.voteScore}</div>
      </div>

      <Link to={`/post/${post.id}`}><h2>{post.title}</h2></Link>
      <small>Posted by <em>{post.author}</em> on {new Date(post.timestamp).toLocaleString()} · {post.commentCount} comments</small>
      <main className="post-body">{post.body}</main>

      <div className="actions">
        <button onClick={() => actions.updatePostScore(post, 'upVote')}><i className="fa fa-thumbs-o-up"></i> Upvote</button>
        <button onClick={() => actions.updatePostScore(post, 'downVote')}><i className="fa fa-thumbs-o-down"></i> Downvote</button>
        <button onClick={() => props.history.push(`/post/${post.id}/edit`)}><i className="fa fa-pencil"></i> Edit</button>
        <button onClick={() => {
          actions.deletePost(post)
            .then(props.history.push(`/`));
        }}><i className="fa fa-trash"></i> Delete</button>
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

export default withRouter(connect(null, mapDispatchToProps)(PostListItem));
