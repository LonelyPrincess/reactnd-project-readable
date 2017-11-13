import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CommentBox from './CommentBox';
import PostListItem from './PostListItem';
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
    const { post } = this.props;

    if (!post) {
      return null;
    }

    return (
      <div>
        <PostListItem post={post} />
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
    post: state.postReducer[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPost: (postId) => dispatch(PostActions.fetchPostData({ postId }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
