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

  componentWillMount() {
    this.props.actions.fetchCommentsForPost(this.props.post);
  }

  // TODO: move individual comment to new component
  // TODO: add controls to modify, edit or delete comments
  render() {
    return (
      <div className="comment-box">
        <h3>Comments ({this.props.comments.length})</h3>
        {this.props.comments.map((comment) => (
          <div className="comment" key={comment.id}>
            {comment.body}
            <small>Posted by <em>{comment.author}</em> on {new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}

        { /* Comment form */ }
        <p>Wanna share your thoughts?</p>
        <CommentForm post={this.props.post} />
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
      fetchCommentsForPost: (post) => dispatch(CommentActions.fetchCommentsForPost({ post }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
