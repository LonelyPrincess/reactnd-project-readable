
/**
 * Generic method to be used as a base for asyncronous action creators.
 *
 * @param {string} actionType - Identifier of the action to create.
 * @param {Promise} ajaxPromise - Promise object for the ajax request to be run.
 * @param {object} data - Data to be included in the generated action.
 *
 * @returns {object} Redux action.
 */
export function createAsyncAction (actionType, ajaxPromise, { status = null, response = null, ...data } = {}) {

    if (status === 'success' || status === 'error') {
      return {
        type: actionType,
        status,
        response,
        ...data
      };
    }

    return (dispatch) => {
      ajaxPromise
        .then((response) => {
          let resStatus = response.error ? 'error' : 'success';
          dispatch(createAsyncAction(actionType, ajaxPromise, { status: resStatus, response, ...data }));
        })
        .catch((response) => {
          dispatch(createAsyncAction(actionType, ajaxPromise, { status: 'error', response, ...data }));
        })
    };
  }
