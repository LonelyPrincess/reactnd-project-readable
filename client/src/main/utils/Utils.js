import uuidv4 from 'uuid/v4';

/**
 * Sort array of objects based on a property.
 *
 * @param {array} objArray - Identifier of the action to create.
 * @param {string} property - Object property to compare.
 * @param {string} order - Used to specify ascending or descending order.
 *
 * @returns {array} Sorted array.
 */
export function sortByObjectProperty (objArray, property, order = 'DESC') {
  return objArray.sort((a, b) => {
    let result = 0;

    if (a[property] > b[property]) {
      result = (order === 'DESC' ? -1 : 1);
    } else if (a[property] < b[property]) {
      result = (order === 'DESC' ? 1 : -1);
    }

    return result;
  });
}

/**
 * Generate random uuid without separator characters.
 *
 * @returns {string} Generated id with a length of 22 characters.
 */
export function generateRandomId () {
  return uuidv4().replace(/-/gi, '').substr(-22);
}
