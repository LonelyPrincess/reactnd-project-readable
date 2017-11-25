import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Link, Route, withRouter } from 'react-router-dom';

import * as PostActions from './actions/post';

import PostList from './components/PostList';
import PostForm from './components/PostForm';
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

            { /* Show sort options only in post list pages */ }
            {["/", "/:category"].map(path => (
              <Route key={path} path={path} exact render={() => (
                <section className="side-block">
                  <h1>Sort by</h1>
                  <ul>
                    <li><a onClick={() => this.sortPostsBy('timestamp')}>Date</a></li>
                    <li><a onClick={() => this.sortPostsBy('voteScore')}>Score</a></li>
                  </ul>
                </section>
              )} />
            ))}

            <section className="side-block">
              <h1>Readable</h1>
              <ul>
                <li><a href="https://es.linkedin.com/in/sara-hern%C3%A1ndez-su%C3%A1rez-167013115" target="_blank" rel="noopener noreferrer">Author</a></li>
                <li><a href="https://github.com/LonelyPrincess/reactnd-project-readable" target="_blank" rel="noopener noreferrer">Repository</a></li>
              </ul>
            </section>
          </aside>

          <main>
            <Switch>
              <Route path="/" exact component={PostList} />

              <Route path="/create" exact component={PostForm} />

              <Route path="/:category" exact component={PostList} />

              <Route path="/:category/:postId" exact render={({ match, location }) => (
                <PostDetails
                  key={location.key}
                  postId={match.params.postId} />
              )} />

              <Route path="/:category/:postId/edit" render={({ match, location }) => (
                <PostForm
                  key={location.key}
                  postId={match.params.postId} />
              )} />
            </Switch>

            { this.props.location.pathname !== "/create"
              && <Link to="/create" className="floating-btn"></Link> }
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
