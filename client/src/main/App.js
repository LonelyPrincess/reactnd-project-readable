import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostActions from './actions/post';
import * as CategoryActions from './actions/category';

class App extends Component {
  componentWillMount () {
    this.props.actions.fetchPosts();
    this.props.actions.fetchCategories();
  }

  incrementPostScore = (post, value) => {
    this.props.actions.updatePostScore({ post, voteType: value });
  };

  sortPostsBy = (criteria) => {
    this.props.actions.sortPostsBy({ criteria });
  };

  sortPostsBy = (category) => {
    console.log(`Filtering posts by category ${category.name}...`);
    this.props.actions.filterPostsBy({ category });
  };

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <ul>
          {this.props.categories.map((category) => (
            <li key={category.path} onClick={() => this.sortPostsBy(category)}>{category.name}</li>
          ))}
        </ul>
        <h1>Posts</h1>
        <button onClick={() => this.sortPostsBy('timestamp')}>Sort by date</button>
        <button onClick={() => this.sortPostsBy('voteScore')}>Sort by score</button>
        {this.props.posts.map((post) => {
          let score = post.voteScore;
          return (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>Posted by {post.author} on {new Date(post.timestamp).toLocaleString()} · {post.commentCount} comments</p>
              <p>{post.body}</p>
              <div className={'score ' + (score > 0 ? 'positive' : (score < 0 ? 'negative' : null))}>{score}</div>
              <div className="actions">
                <button onClick={() => this.incrementPostScore(post, "upVote")}>Upvote</button>
                <button onClick={() => this.incrementPostScore(post, "downVote")}>Downvote</button>
                <button onClick={() => this.props.actions.deletePost({ post })}>Delete</button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
}

// We transform the state structure as we had it in our reducer
// as we want it in our component props
function mapStateToProps(state) {
  return {
    posts: state.postReducer,
    categories: state.categoryReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      deletePost: (data) => dispatch(PostActions.deletePost(data)),
      updatePostScore: (data) => dispatch(PostActions.updatePostScore(data)),
      sortPostsBy: (data) => dispatch(PostActions.sortPostsBy(data)),
      filterPostsBy: (data) => dispatch(PostActions.filterPostsBy(data)),
      fetchCategories: () => dispatch(CategoryActions.fetchCategories())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
