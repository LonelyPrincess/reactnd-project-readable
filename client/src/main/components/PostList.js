import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as PostActions from '../actions/post';
import * as CategoryActions from '../actions/category';

import PostListItem from './PostListItem';

/**
 * Component to display a list of posts.
 *
 * @module components/PostList
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {string} props.category - Category which will be used to filter
 *  the displayed elements.
 */
class PostList extends Component {
  componentWillMount() {
    this.props.actions.fetchPosts();
    this.props.actions.setActiveCategory(this.props.category);
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
        ))}
      </div>
    );
  }
}

PostList.propTypes = {
  category: PropTypes.string
};

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps(state) {
  return {
    posts: state.posts,
    activeCategory: state.activeCategory
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      setActiveCategory: (category) => dispatch(CategoryActions.setActiveCategory(category))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
