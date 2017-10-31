import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostActions from './actions/post';

class App extends Component {

  componentWillMount () {
    this.props.actions.fetchPosts();
  }

  // TODO: do this inside of a reducer!!!
  incrementPostScore = (post, value) => {
    let posts = this.props.posts;
    let postIndex = posts
      .findIndex((item) => item.id === post.id);

    posts[postIndex].voteScore += value;

    this.setState({ posts });
  };

  render() {
    return (
      <div>
        <h1>Posts</h1>
        {this.props.posts.map((post) => {
          let score = post.voteScore;
          return (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>Posted by {post.author} on {new Date(post.timestamp).toLocaleString()} · {post.commentCount} comments</p>
              <p>{post.body}</p>
              <div className={'score ' + (score > 0 ? 'positive' : (score < 0 ? 'negative' : null))}>{score}</div>
              <div className="actions">
                <button onClick={() => this.incrementPostScore(post, 1)}>Upvote</button>
                <button onClick={() => this.incrementPostScore(post, -1)}>Downvote</button>
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
function mapStateToProps(posts) {
  return {
    posts: posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      createPost: (data) => dispatch(PostActions.createPost(data)),
      updatePostScore: (data) => dispatch(PostActions.updatePostScore(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
