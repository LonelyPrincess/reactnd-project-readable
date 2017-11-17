/**
 * This module contains a couple of methods that will make it possible to
 * interact with the posts' API used by this application.
 *
 * @module utils/PostsAPI
 * @author Sara Hernández <sara.her.su@gmail.com>
 */

import generateUuid from 'generate-uuid';

const api = 'http://localhost:3001';

// Generate a unique token for storing your data on the backend server
let token;
try {
  token = localStorage.token;
  if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
  }
} catch (error) {
  console.warn("Failed to init token due to an error! Using mock token instead...");
  token = 'testToken';
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

/**
 * Obtain the list of all of the available posts.
 * @returns {Promise} Promise object with an array of posts.
 */
export const getAll = () => {
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json());
};

/**
 * Obtain information on a single post.
 * @returns {Promise} Promise object with a post.
 */
export const get = (postId) => {
  return fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json());
};

/**
 * Update score for an existing post.
 * @param {Object} post - Post to update.
 * @param {string} option - Type of vote to apply (upvote or downvote).
 * @returns {Promise} Promise object with updated post.
 */
export const vote = (post, option) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());
};

/**
 * Remove an existing post.
 * @param {Object} post - Post to delete.
 * @returns {Promise} Promise object with deleted post.
 */
export const remove = (post, option) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};

/**
 * Obtain the list of the available categories.
 * @returns {Promise} Promise object with an array of categories.
 */
export const getCategories = () => {
  return fetch(`${api}/categories`, { headers })
    .then(res => res.json());
};

/**
 * Obtain the list of the posts published under the specified category.
 * @returns {Promise} Promise object with an array of posts.
 */
export const getFromCategory = (category) => {
  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());
};


/**
 * Obtain the list of comments for a certain posts.
 * @returns {Promise} Promise object with an array of comments.
 */
export const getPostComments = (post) => {
  return fetch(`${api}/posts/${post.id}/comments`, { headers })
    .then(res => res.json());
};

/**
 * Creates a new comment and returns new object.
 * @returns {Promise} Promise object with the created comment.
 */
export const postComment = (post, comment) => {
  const data = {
    id: generateUuid().substr(-12),
    timestamp: new Date(),
    body: comment.body,
    author: comment.author,
    parentId: post.id
  }

  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

/**
 * Creates a new post and returns new object.
 * @returns {Promise} Promise object with the created post.
 */
export const createPost = ({ title, body, author, category }) => {
  const data = {
    id: generateUuid().substr(-12),
    timestamp: new Date().getTime(),
    title,
    body,
    author,
    category
  }

  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

/**
 * Edit data for an existing post.
 * @param {Object} post - Post to modify.
 * @returns {Promise} Promise object with updated post.
 */
export const editPost = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body
    })
  }).then(res => res.json());
};

/**
 * Update score for an existing comment.
 * @param {Object} comment - Post to update.
 * @param {string} option - Type of vote to apply (upvote or downvote).
 * @returns {Promise} Promise object with updated comment.
 */
export const updateCommentScore = (comment, option) => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());
};

/**
 * Remove an existing comment.
 * @param {Object} comment - Post to delete.
 * @returns {Promise} Promise object with deleted comment.
 */
export const deleteComment = (comment) => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};

/**
 * Edit data for an existing comment.
 * @param {Object} comment - Comment to edit.
 * @returns {Promise} Promise object with edited comment.
 */
export const editComment = (comment) => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body: comment.body
    })
  }).then(res => res.json());
};
