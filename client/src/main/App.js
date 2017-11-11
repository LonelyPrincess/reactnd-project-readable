import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostActions from './actions/post';
import * as CommentActions from './actions/comment';
import * as CategoryActions from './actions/category';

import PostListItem from './components/PostListItem';

class App extends Component {
  componentWillMount () {
    this.props.actions.fetchPosts();
    this.props.actions.fetchCategories();
  }

  sortPostsBy = (criteria) => {
    this.props.actions.sortPostsBy({ criteria });
  };

  filterPostsBy = (category) => {
    console.log(`Filtering posts by category ${category.name}...`);
    this.props.actions.filterPostsBy({ category });
  };

  getCommentsFor = (post) => {
    this.props.actions.fetchCommentsForPost({ post });
  };

  render() {
    return (
      <div className="container">
        <header className="row logo">
          <h1>★ Readable ★</h1>
          <small><em>Read</em> to learn and <em>post</em> your own thoughts</small>
        </header>

        <div className="row">
          <aside>
            <section className="side-block">
              <h1>Categories</h1>
              <ul>
                {this.props.categories.map((category) => (
                  <li key={category.path}><a onClick={() => this.filterPostsBy(category)}>{category.name}</a></li>
                ))}
              </ul>
            </section>

            <section className="side-block">
              <h1>Sort by</h1>
              <ul>
                <li><a onClick={() => this.sortPostsBy('timestamp')}>Date</a></li>
                <li><a onClick={() => this.sortPostsBy('voteScore')}>Score</a></li>
              </ul>
            </section>

            <section className="side-block">
              <h1>Readable</h1>
              <ul>
                <li><a href="https://es.linkedin.com/in/sara-hern%C3%A1ndez-su%C3%A1rez-167013115" target="_blank">Author</a></li>
                <li><a href="https://github.com/LonelyPrincess/reactnd-project-readable" target="_blank">Repository</a></li>
              </ul>
            </section>
          </aside>

          <main>
            <div className="roadmap"><a>Main</a> > <a>List</a></div>

            {this.props.posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}

            <h3>Comments</h3>
            <div className="comment-box">
              {this.props.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  {comment.body}
                  <small>Posted by <em>{comment.author}</em> on {new Date(comment.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </main>
        </div>

      </div>
    );
  }
}

// We transform the state structure as we had it in our reducer
// as we want it in our component props
function mapStateToProps(state) {
  return {
    posts: state.postReducer,
    categories: state.categoryReducer,
    comments: state.commentReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      sortPostsBy: (data) => dispatch(PostActions.sortPostsBy(data)),
      filterPostsBy: (data) => dispatch(PostActions.filterPostsBy(data)),
      fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
      fetchCommentsForPost: (data) => dispatch(CommentActions.fetchCommentsForPost(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
