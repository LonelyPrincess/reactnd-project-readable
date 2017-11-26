import React, { Component } from 'react';
import { Switch, Link, Route, withRouter } from 'react-router-dom';

import SideBar from './components/sidebar/SideBar';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetails from './components/PostDetails';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="row logo">
          <h1>★ Readable ★</h1>
          <small><em>Read</em> to learn and <em>post</em> your own thoughts</small>
        </header>

        <div className="row">

          { /* Sidebar with navigation buttons */ }
          <SideBar />

          { /* Application body */ }
          <main>
            <Switch>
              <Route path="/" exact component={PostList} />

              <Route path="/create" exact component={PostForm} />

              <Route path="/:category" exact render={({ match, location }) => (
                <PostList category={match.params.category} />
              )} />

              <Route path="/:category/:postId" exact render={({ match, location }) => (
                <PostDetails category={match.params.category} postId={match.params.postId} />
              )} />

              <Route path="/:category/:postId/edit" render={({ match, location }) => (
                <PostForm category={match.params.category} postId={match.params.postId} />
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

export default withRouter(App);
