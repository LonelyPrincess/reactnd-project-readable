import React, { Component } from 'react';

import * as PostsAPI from './utils/PostsAPI';

class App extends Component {
  state = {
    posts: []
  };

  componentWillMount () {
    PostsAPI.getAll()
      .then((posts) => {
        console.log(`${posts.length} posts found`);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        {this.state.posts.map((post) => {
          let score = post.voteScore;
          return (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>Posted by {post.author} on {new Date(post.timestamp).toLocaleString()} · {post.commentCount} comments</p>
              <p>{post.body}</p>
              <div className={'score ' + (score > 0 ? 'positive' : (score < 0 ? 'negative' : null))}>{score}</div>
            </article>
          );
        })}
      </div>
    );
  }
}

export default App;
