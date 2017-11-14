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
    message: ''
  }

  createComment = (event) => {
    event.preventDefault();

    const { actions, post } = this.props;
    actions.createComment(post, {
      author: this.state.author,
      body: this.state.message
    });

    this.setState({
      author: '',
      message: ''
    });
  };

  render () {
    return (
      <form onSubmit={this.createComment}>
          <label htmlFor="comment-author">Author</label>
          <input name="comment-author" value={this.state.author} required
            onChange={(event) => this.setState({ author: event.target.value })} />

          <label htmlFor="comment-body">Message</label>
          <textarea name="comment-body" value={this.state.message} required
            onChange={(event) => this.setState({ message: event.target.value })}></textarea>

          <button type="submit">Post comment</button>
      </form>
    );
  }

}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createComment: (post, comment) => dispatch(CommentActions.postNewComment({ post, comment }))
    }
  };
}

export default connect(null, mapDispatchToProps)(CommentForm);