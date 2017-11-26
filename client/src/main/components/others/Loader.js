import React from 'react';

/**
 * Stateless component to display a loader.
 *
 * @module components/Loader
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function Loader () {
  return (
    <div className="loader">
      <i className="fa fa-spin fa-3x fa-star-o"></i>
    </div>
  );
};

export default Loader;
