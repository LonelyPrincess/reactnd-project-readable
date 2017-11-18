import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommentBox from './CommentBox';
import * as PostActions from '../actions/post';

/**
 * Component used to display all information on a post.
 *
 * @module components/PostDetails
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.postId - Identifier of the post to be displayed.
 */
class PostDetails extends Component {

  componentWillMount() {
    this.props.actions.fetchPost(this.props.postId);
  }

  render() {
    const { post, actions } = this.props;

    if (!post) {
      return (
        <small>Post not found</small>
      );
    }

    if (post.id !== this.props.postId) {
      console.log("Still loading...");
      return null;
    }

    return (
      <div className="post-details">
        <article className="post">
          <div className={`score-box ${(post.voteScore > 0 && 'positive') || (post.voteScore < 0 && 'negative')}`}>
            <div className="icon"></div>
            <div className="score">{post.voteScore}</div>
          </div>

          <h2>{post.title}</h2>
          <small>Posted by <em>{post.author}</em> on {new Date(post.timestamp).toLocaleString()}</small>
          <main className="post-body">{post.body}</main>

          <div className="actions">
            <button onClick={() => actions.updatePostScore(post, 'upVote')}><i className="fa fa-thumbs-o-up"></i> Upvote</button>
            <button onClick={() => actions.updatePostScore(post, 'downVote')}><i className="fa fa-thumbs-o-down"></i> Downvote</button>
            <button onClick={() => this.props.history.push(`/post/${post.id}/edit`)}><i className="fa fa-pencil"></i> Edit</button>
            <button onClick={() => {
              actions.deletePost(post)
                .then(this.props.history.push(`/`));
            }}><i className="fa fa-trash"></i> Delete</button>
          </div>
        </article>

        <CommentBox post={post} />
      </div>
    );
  }
}

PostDetails.propTypes = {
  postId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    post: state.activePostReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPost: (postId) => dispatch(PostActions.fetchPostData({ postId })),
      deletePost: (post) => dispatch(PostActions.deletePost({ post })),
      updatePostScore: (post, voteType) => dispatch(PostActions.updatePostScore({ post, voteType }))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
