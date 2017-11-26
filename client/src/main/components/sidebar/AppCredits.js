import React from 'react';

/**
 * Stateless component containing some application related links.
 *
 * @module components/AppCredits
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function AppCredits () {
  return (
    <ul>
      <li>
        <i className="fa fa-fw fa-linkedin"></i>
        <a href="https://es.linkedin.com/in/sara-hern%C3%A1ndez-su%C3%A1rez-167013115" target="_blank" rel="noopener noreferrer">Author</a>
      </li>
      <li>
        <i className="fa fa-fw fa-github"></i>
        <a href="https://github.com/LonelyPrincess/reactnd-project-readable" target="_blank" rel="noopener noreferrer">Repository</a>
      </li>
    </ul>
  );
};

export default AppCredits;
