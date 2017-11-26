import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as PostActions from '../actions/post';
import * as CategoryActions from '../actions/category';

/**
 * Component to create or edit a post.
 *
 * @module components/PostForm
 * @author Sara Hernández <sara.her.su@gmail.com>
 * @param {object} props - Component props.
 * @param {object} props.postId - Id of the post to edit (if applicable).
 */
class PostForm extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    editMode: false
  };

  /**
   * Event handler that will be triggered when the component is mounted.
   *
   * When it triggers, enable edit mode if the component received a post id
   * as props. Otherwise, keep fields empty in the state to create a new one.
   * If there's an active category, initialize the category field with that value.
   */
  componentWillMount () {
    if (this.props.postId) {
      this.setState({ editMode: true });
      this.props.actions.fetchPost(this.props.postId)
        .then(this.initializeFormWithPostData);
      this.props.actions.setActiveCategory(this.props.category);
    } else {
      this.setState({
        editMode: false,
        category: this.props.activeCategory || ''
      });
    }
  }

  /**
   * Initialize component state based on the post included in the props.
   */
  initializeFormWithPostData = () => {
    const post = this.props.post;
    this.setState({
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    });
  };

  /**
   * Handler for the 'submit' event of the form, which will allow the user to
   * save the post into the database.
   */
  savePost = (event) => {
    event.preventDefault();

    if (this.state.editMode) {
      this.props.actions.editPost({ ...this.props.post, ...this.state })
        .then(() => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`));
    } else {
      this.props.actions.createPost(this.state)
        .then(() => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`));
    }
  };

  render () {
    return (
      <form onSubmit={this.savePost}>
          <label htmlFor="title">Title</label>
          <input name="title" value={this.state.title} required
            onChange={(event) => this.setState({ title: event.target.value })} />

          <label htmlFor="author">Author</label>
          <input name="author" value={this.state.author} required readOnly={this.state.editMode}
            onChange={(event) => this.setState({ author: event.target.value })} />

          <label htmlFor="category">Category</label>
          <select name="category" value={this.state.category} required disabled={this.state.editMode}
            onChange={(event) => this.setState({ category: event.target.value })}>
            <option className="placeholder" value="" disabled>Choose one</option>
            {this.props.categories.map((category) => (
              <option key={category.path} value={category.path}>{category.name}</option>
            ))}
          </select>

          <label htmlFor="body">Body</label>
          <textarea name="body" value={this.state.body} required
            onChange={(event) => this.setState({ body: event.target.value })}></textarea>

          <button type="submit">{this.state.editMode ? 'Update' : 'Create'} post</button>
      </form>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object,
  category: PropTypes.string
};

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps(state) {
  return {
    post: state.activePost,
    categories: state.categories,
    activeCategory: state.activeCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
      createPost: (data) => dispatch(PostActions.createPost(data)),
      fetchPost: (postId) => dispatch(PostActions.fetchPostData({ postId })),
      editPost: (data) => dispatch(PostActions.editPost(data)),
      setActiveCategory: (category) => dispatch(CategoryActions.setActiveCategory(category))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
