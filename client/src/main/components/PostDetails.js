import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CommentBox from './CommentBox';
import Loader from './others/Loader';
import ErrorMessage from './others/ErrorMessage';

import * as PostActions from '../actions/post';
import * as CommentActions from '../actions/comment';
import * as CategoryActions from '../actions/category';

/**
 * Component used to display all information on a post.
 *
 * @module components/PostDetails
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.postId - Identifier of the post to be displayed.
 */
class PostDetails extends Component {

  state = {
    isLoading: false
  };

  componentWillMount() {
    this.setState({ isLoading: true });
    this.props.actions.fetchPost(this.props.postId)
      .then(() => {
        if (!this.props.post) {
          this.setState({ isLoading: false });
        } else {
          this.props.actions.fetchCommentsForPost(this.props.post)
            .then(this.setState({ isLoading: false }));
        }
      });
    this.props.actions.setActiveCategory(this.props.category);
  }

  render() {
    const { post, actions } = this.props;

    if (!post) {
      return (
        <ErrorMessage details={`Post with id ${this.props.postId} doesn't exist or has been deleted.`} />
      );
    }

    if (this.state.isLoading) {
      return (<Loader />);
    }

    return (
      <div className="post-details">
        <article className="post">
          <div className={`score-box ${(post.voteScore > 0 && 'positive') || (post.voteScore < 0 && 'negative')}`}>
            <div className="icon"></div>
            <div className="score">{post.voteScore}</div>
          </div>

          <h2>{post.title}</h2>
          <small>Posted by <em>{post.author}</em> on <time>{new Date(post.timestamp).toLocaleString()}</time></small>
          <main className="post-body">{post.body}</main>

          <div className="button-container">
            <div className="info">
              <button disabled><i className="fa fa-tag"></i> {post.category}</button>
            </div>
            <div className="actions">
              <button onClick={() => actions.updatePostScore(post, 'upVote')}><i className="fa fa-thumbs-o-up"></i> Upvote</button>
              <button onClick={() => actions.updatePostScore(post, 'downVote')}><i className="fa fa-thumbs-o-down"></i> Downvote</button>
              <button onClick={() => this.props.history.push(`/${post.category}/${post.id}/edit`)}><i className="fa fa-pencil"></i> Edit</button>
              <button onClick={() => {
                actions.deletePost(post)
                  .then(this.props.history.push(`/`));
              }}><i className="fa fa-trash"></i> Delete</button>
            </div>
          </div>
        </article>

        <CommentBox />
      </div>
    );
  }
}

PostDetails.propTypes = {
  postId: PropTypes.string.isRequired
};

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps(state) {
  return {
    post: state.activePost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPost: (postId) => dispatch(PostActions.fetchPostData({ postId })),
      deletePost: (post) => dispatch(PostActions.deletePost({ post })),
      updatePostScore: (post, voteType) => dispatch(PostActions.updatePostScore({ post, voteType })),
      setActiveCategory: (category) => dispatch(CategoryActions.setActiveCategory(category)),
      fetchCommentsForPost: (post) => dispatch(CommentActions.fetchCommentsForPost({ post }))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails));
