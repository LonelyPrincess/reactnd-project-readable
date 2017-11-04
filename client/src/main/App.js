import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostActions from './actions/post';

class App extends Component {

  componentWillMount () {
    this.props.actions.fetchPosts();
  }

  incrementPostScore = (post, value) => {
    this.props.actions.updatePostScore({ post, voteType: value });
  };

  sortPostsBy = (criteria) => {
    this.props.actions.sortPostsBy({ criteria });
  };

  render() {
    return (
      <div>
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
function mapStateToProps(posts) {
  return {
    posts: posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchPosts: () => dispatch(PostActions.fetchPosts()),
      deletePost: (data) => dispatch(PostActions.deletePost(data)),
      updatePostScore: (data) => dispatch(PostActions.updatePostScore(data)),
      sortPostsBy: (data) => dispatch(PostActions.sortPostsBy(data)),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
