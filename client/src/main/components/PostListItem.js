import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  const MAX_LENGTH = 500;
  const postIsTooLong = post.body.length > MAX_LENGTH;

  return (
    <article className="post">
      <div className={`score-box ${(post.voteScore > 0 && 'positive') || (post.voteScore < 0 && 'negative')}`}>
        <div className="icon"></div>
        <div className="score">{post.voteScore}</div>
      </div>

      <Link to={`/${post.category}/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <small>Posted by <em>{post.author}</em> on {new Date(post.timestamp).toLocaleString()}</small>
      <main className="post-body">
        {postIsTooLong ? `${post.body.substring(0, MAX_LENGTH)}...` : post.body }
        {postIsTooLong && (
          <p>
            <Link to={`/${post.category}/${post.id}`}>
              <i className="fa fa-plus-circle"></i> Read more
            </Link>
          </p>
        )}
      </main>

      <div className="button-container">
        <div className="info">
          <button disabled><i className="fa fa-tag"></i> {post.category}</button>
          <button disabled><i className="fa fa-comments"></i> {post.commentCount} comments</button>
        </div>
        <div className="actions">
          <button onClick={() => actions.updatePostScore(post, 'upVote')}><i className="fa fa-thumbs-o-up"></i> Upvote</button>
          <button onClick={() => actions.updatePostScore(post, 'downVote')}><i className="fa fa-thumbs-o-down"></i> Downvote</button>
          <Link to={`/${post.category}/${post.id}/edit`}><button><i className="fa fa-pencil"></i> Edit</button></Link>
          <button onClick={() => actions.deletePost(post)}><i className="fa fa-trash"></i> Delete</button>
        </div>
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
