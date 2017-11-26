import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import AppCredits from './AppCredits';
import SortOptions from './SortOptions';
import CategoryList from './CategoryList';

/**
 * Stateless component for the sidebar of the application.
 *
 * @module components/SideBar
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function SideBar () {
  return (
    <aside>

      { /* Block with the list of available categories */ }
      <section className="side-block">
        <h1>Categories</h1>
        <CategoryList />
      </section>

      { /* Show sort options only in post list pages */}
      {["/", "/:category"].map(path => (
        <Route key={path} path={path} exact render={({ location }) => location.pathname !== '/create' && (
          <section className="side-block">
            <h1>Sort by</h1>
            <SortOptions />
          </section>
        )} />
      ))}

      { /* Block with some external links related to the application */ }
      <section className="side-block">
        <h1>Readable</h1>
        <AppCredits />
      </section>
    </aside>
  );
};

export default withRouter(SideBar);
