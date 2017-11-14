import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import * as PostActions from './actions/post';

import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import CategoryList from './components/CategoryList';

class App extends Component {

  sortPostsBy = (criteria) => {
    this.props.actions.sortPostsBy({ criteria });
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
              <CategoryList />
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
                <li><a href="https://es.linkedin.com/in/sara-hern%C3%A1ndez-su%C3%A1rez-167013115" target="_blank" rel="noopener noreferrer">Author</a></li>
                <li><a href="https://github.com/LonelyPrincess/reactnd-project-readable" target="_blank" rel="noopener noreferrer">Repository</a></li>
              </ul>
            </section>
          </aside>

          <main>
            <Route path="/category/:category" render={({ match, location }) => (
              <PostList
                key={location.key}
                category={match.params.category} />
            )} />

            <Route path="/" exact component={PostList} />

            <Route path="/post/:postId" render={({ match, location }) => (
              <PostDetails
                key={location.key}
                postId={match.params.postId} />
            )} />

            <div className="floating-btn" />
          </main>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sortPostsBy: (data) => dispatch(PostActions.sortPostsBy(data))
    }
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
