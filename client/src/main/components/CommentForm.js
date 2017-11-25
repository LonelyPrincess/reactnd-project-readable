import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as CommentActions from '../actions/comment';

/**
 * Component to create or edit a comment.
 *
 * @module components/CommentForm
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.post - Post to which the comment will belong
 * @param {object} props.comment - Comment to edit (if applicable).
 */
class CommentForm extends Component {

  state = {
    author: '',
    body: '',
    editMode: false
  }

  componentWillReceiveProps ({ comment }) {
    if (comment) {
      this.setState({
        author: comment.author,
        body: comment.body,
        editMode: true
      });
    }
  }

  resetForm = () => {
    this.setState({
      author: '',
      body: '',
      editMode: false
    });
  }

  saveComment = (event) => {
    event.preventDefault();

    const { actions, post, comment } = this.props;

    if (this.state.editMode) {
      actions.editComment({ ...comment, ...this.state })
        .then(this.resetForm)
        .then(actions.setActiveComment(null));
    } else {
      actions.createComment(post, this.state)
        .then(this.resetForm);
    }
  };

  render () {
    return (
      <form onSubmit={this.saveComment}>
          <label htmlFor="comment-author">Author</label>
          <input name="comment-author" value={this.state.author} required
            onChange={(event) => this.setState({ author: event.target.value })}
            readOnly={this.state.editMode} />

          <label htmlFor="comment-body">Message</label>
          <textarea name="comment-body" value={this.state.body} required
            onChange={(event) => this.setState({ body: event.target.value })}></textarea>

          <button type="submit">{this.state.editMode ? 'Update' : 'Post'} comment</button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object
};

function mapStateToProps(state) {
  let activeComment = null;

  if (state.activeCommentReducer) {
    let commentIndex = state.commentReducer.findIndex(comment => comment.id === state.activeCommentReducer);
    activeComment = state.commentReducer[commentIndex];
  }

  return {
    comment: activeComment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      setActiveComment: (comment) => dispatch(CommentActions.setActiveComment(comment)),
      createComment: (post, comment) => dispatch(CommentActions.postNewComment({ post, comment })),
      editComment: (comment) => dispatch(CommentActions.editComment({ comment }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);