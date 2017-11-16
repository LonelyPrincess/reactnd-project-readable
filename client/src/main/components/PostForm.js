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
 * @param {object} props.post - Post to edit (if applicable).
 */
class PostForm extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  // TODO: if editing, set post
  componentWillMount () {
    this.setState({
      category: this.props.category
    });
  }

  savePost = (event) => {
    event.preventDefault();
    this.props.actions.createPost(this.state)
      .then(() => this.props.history.push(`/post/${this.props.post.id}`));

    // TODO: check if action ended up in error: if so, don't redirect
  };

  render () {
    return (
      <form onSubmit={this.savePost}>
          <label htmlFor="title">Title</label>
          <input name="title" value={this.state.title} required
            onChange={(event) => this.setState({ title: event.target.value })} />

          <label htmlFor="author">Author</label>
          <input name="author" value={this.state.author} required
            onChange={(event) => this.setState({ author: event.target.value })} />

          <label htmlFor="category">Category</label>
          <select name="category" value={this.state.category} required
            onChange={(event) => this.setState({ category: event.target.value })}>
            {this.props.categories.map((category) => (
              <option key={category.path} value={category.path}>{category.name}</option>
            ))}
          </select>

          <label htmlFor="body">Body</label>
          <textarea name="body" value={this.state.body} required
            onChange={(event) => this.setState({ body: event.target.value })}></textarea>

          <button type="submit">Create post</button>
      </form>
    );
  }

}

PostForm.propTypes = {
  post: PropTypes.object,
  category: PropTypes.string
};

function mapStateToProps(state) {
  return {
    post: state.postReducer[0],
    categories: state.categoryReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
      createPost: (data) => dispatch(PostActions.createPost(data))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));