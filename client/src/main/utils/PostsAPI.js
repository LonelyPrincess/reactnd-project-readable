/**
 * This module contains a couple of methods that will make it possible to
 * interact with the posts' API used by this application.
 *
 * @module utils/PostsAPI
 * @author Sara Hernández <sara.her.su@gmail.com>
 */

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
 * Obtain the list of the books in current user's collection.
 * @returns {Promise} Promise object with an array of books.
 */
export const getAll = () => {
  return fetch(`${api}/posts`, { headers })
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
