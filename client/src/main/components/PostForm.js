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
    category: '',
    editMode: false
  };

  // TODO: if editing, set post
  componentWillMount () {

    // TODO: this may be in redux state instead?
    this.setState({
      category: this.props.category || ''
    });

    if (this.props.postId) {
      this.props.actions.fetchPost(this.props.postId);
    }
  }

  componentWillReceiveProps (newProps) {
    const post = newProps.post;
    if (post) {
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        editMode: true
      });
    }
  }

  savePost = (event) => {
    event.preventDefault();

    if (this.state.editMode) {
      this.props.actions.editPost({ ...this.props.post, ...this.state })
        .then(() => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`));
    } else {
      this.props.actions.createPost(this.state)
        .then(() => this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`));
    }

    // TODO: check if action ended up in error: if so, don't redirect
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

function mapStateToProps(state) {
  return {
    post: state.activePostReducer,
    categories: state.categoryReducer.list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
      createPost: (data) => dispatch(PostActions.createPost(data)),
      fetchPost: (postId) => dispatch(PostActions.fetchPostData({ postId })),
      editPost: (data) => dispatch(PostActions.editPost(data))
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
