import React from 'react';
import { connect } from 'react-redux';

import * as PostActions from '../actions/post';

/* Available sorting criteria */
const availableCriteria = [
  { property: 'timestamp', description: 'Date', icon: 'clock-o' },
  { property: 'voteScore', description: 'Score', icon: 'star-o' },
  { property: 'commentCount', description: 'Comments', icon: 'comments-o' }
];

/**
 * Stateless component with different options to sort the post list.
 *
 * @module components/SortOptions
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
function SortOptions (props) {
  return (
    <ul>
      {availableCriteria.map((criteria) => (
        <li key={criteria.property} className={criteria.property === props.activeCriteria ? 'active' : ''}>
          <i className={`fa fa-fw fa-${criteria.icon}`}></i>
          <a onClick={() => props.actions.sortPostsBy(criteria.property)}>{criteria.description}</a>
        </li>
      ))}
    </ul>
  );
};

// TODO: include active sorting criteria in redux store

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      sortPostsBy: (criteria) => dispatch(PostActions.sortPostsBy({ criteria }))
    }
  };
}

export default connect(null, mapDispatchToProps)(SortOptions);
