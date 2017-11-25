import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostActions from '../actions/post';

import PostListItem from './PostListItem';

class PostList extends Component {
  componentWillMount() {
    this.props.actions.fetchPosts();
  }

  render() {
    const { posts, activeCategory } = this.props;

    const postsToDisplay = posts
      .filter(post => !activeCategory || post.category === activeCategory);

    return (
      <div className="post-list">
        <small className="stats">
          {postsToDisplay.length
            ? `Showing ${postsToDisplay.length} posts `
            : `No posts found `}
          for <em>{activeCategory ? `"${activeCategory}"` : `all categories`}</em>
        </small>

        {postsToDisplay.map((post) => (
            <PostListItem key={post.id} post={post} />
          )
        )}
      </div>
    );
  }
}

// We transform the state structure as we had it in our reducer
// as we want it in our component props
function mapStateToProps(state) {
  return {
    posts: state.postReducer,
    activeCategory: state.categoryReducer.active
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
