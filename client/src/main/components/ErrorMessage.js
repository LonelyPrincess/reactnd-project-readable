import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component to display an error page.
 *
 * @module components/ErrorMessage
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function ErrorMessage (props) {
  return (
    <section className="error-details">
      <h2>Oops! Someting went wrong!</h2>
      <div className="image"></div>
      <p>Sorry, we couldn't find the page you're looking for.</p>

      {props.details && (
        <pre>{props.details}</pre>
      )}
    </section>
  );
};

ErrorMessage.propTypes = {
  details: PropTypes.string
};

export default ErrorMessage;
