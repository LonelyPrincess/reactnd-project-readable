/**
 * This module contains methods to interact with the categories database.
 *
 * @module Readable/API/Categories
 * @author Richard Kalehoff <richardkalehoff@gmail.com>
 * @author Sara Hernández <sara.her.su@gmail.com>
 */

const clone = require('clone');
const defaultData = require('../data/categories.json');

let db = {};

/**
 * Initialize database content to default data or, if it already exists
 * for current user session, return existing data.
 * @param {string} token - Token to identify user session.
 * @returns {array} Available categories in database.
 */
function getData (token) {
  let data = db[token];
  if (!data) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

/**
 * Obtain list of all categories.
 * @param {string} token - Token to identify user session.
 * @returns {Promise} Promise object with an array of categories.
 */
function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  });
}

module.exports = {
  getAll
};
