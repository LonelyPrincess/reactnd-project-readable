import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as PostActions from '../actions/post';

import PostListItem from './PostListItem';

class PostList extends Component {
  componentWillMount() {
    const { actions, category } = this.props;
    if (!category) {
      console.log(`Displaying all posts...`);
      actions.fetchPosts();
    } else {
      console.log(`Displaying posts for category ${category}...`);
      actions.fetchPostsFromCategory(category);
    }
  }

  render() {
    const { posts, category } = this.props;

    return (
      <div className="post-list">
        <p>Displaying {posts.length} posts for <em>{category ? `${category}` : `all categories`}</em></p>

        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

PostListItem.propTypes = {
  category: PropTypes.string
};

// We transform the state structure as we had it in our reducer
// as we want it in our component props
function mapStateToProps(state) {
  return {
    posts: state.postReducer
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      fetchPostsFromCategory: (category) => dispatch(PostActions.filterPostsBy({ category }))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
