import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import * as CommentActions from '../actions/comment';

/**
 * Component that contains all of the comments for a post.
 *
 * @module components/CommentBox
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.post - Post to which the comments belong.
 */
class CommentBox extends Component {

  // TODO: move to redux store?
  state = {
    selectedComment: null
  };

  componentWillMount() {
    this.props.actions.fetchCommentsForPost(this.props.post);
  }

  // TODO: move individual comment to new component
  // TODO: add controls to modify, edit or delete comments
  render() {
    const { actions } = this.props;

    return (
      <div className="comment-box">
        <h3>Comments ({this.props.comments.length})</h3>
        {this.props.comments.map((comment) => (
          <div className="comment" key={comment.id}>

            <div className="comment-score-container">
              <div className="actions">
                <button onClick={() => actions.updateCommentScore(comment, 'downVote')}><i className="fa fa-thumbs-o-down"></i></button>
                <div className="score">{comment.voteScore}</div>
                <button onClick={() => actions.updateCommentScore(comment, 'upVote')}><i className="fa fa-thumbs-o-up"></i></button>
              </div>
              <div className="actions">
                <button onClick={() => this.setState({ selectedComment: comment })}><i className="fa fa-pencil"></i></button>
                <button onClick={() => actions.deleteComment(comment)}><i className="fa fa-trash"></i></button>
              </div>
            </div>

            <div className="body">{comment.body}</div>

            <small>Posted by <em>{comment.author}</em> on {new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}

        { /* Comment form */ }
        <small className="stats">Wanna share your thoughts?</small>
        <CommentForm post={this.props.post} comment={this.state.selectedComment} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  post: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    comments: state.commentReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCommentsForPost: (post) => dispatch(CommentActions.fetchCommentsForPost({ post })),
      updateCommentScore: (comment, voteType) => dispatch(CommentActions.updateCommentScore({ comment, voteType })),
      deleteComment: (comment) => dispatch(CommentActions.deleteComment({ comment }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
