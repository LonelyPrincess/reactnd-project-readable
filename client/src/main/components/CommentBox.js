import React, { Component } from 'react';
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

  goToEditForm = (comment) => {
    this.props.actions.setActiveComment(comment);
    this.refs.commentFormTitle.scrollIntoView();
  };

  render() {
    const { actions } = this.props;

    return (
      <div className="comment-box">
        <h3>Comments ({this.props.comments.length})</h3>
        {this.props.comments.map((comment) => (
          <div className="comment" key={comment.id}>

            <div className="button-container">
              <div className="actions">
                <button onClick={() => actions.updateCommentScore(comment, 'downVote')}><i className="fa fa-thumbs-o-down"></i></button>
                <button className="score" disabled>{comment.voteScore}</button>
                <button onClick={() => actions.updateCommentScore(comment, 'upVote')}><i className="fa fa-thumbs-o-up"></i></button>
              </div>
              <div className="actions">
                <button onClick={() => this.goToEditForm(comment)}><i className="fa fa-pencil"></i></button>
                <button onClick={() => actions.deleteComment(comment)}><i className="fa fa-trash"></i></button>
              </div>
            </div>

            <div className="body">{comment.body}</div>

            <small>Posted by <em>{comment.author}</em> on <time>{new Date(comment.timestamp).toLocaleString()}</time></small>
          </div>
        ))}

        { /* Comment form */ }
        <small ref="commentFormTitle" className="stats">Wanna share your thoughts?</small>
        <CommentForm />
      </div>
    );
  }
}

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps(state) {
  return {
    post: state.activePost,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setActiveComment: (comment) => dispatch(CommentActions.setActiveComment(comment)),
      updateCommentScore: (comment, voteType) => dispatch(CommentActions.updateCommentScore({ comment, voteType })),
      deleteComment: (comment) => dispatch(CommentActions.deleteComment({ comment }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
