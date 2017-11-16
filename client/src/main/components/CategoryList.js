import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as CategoryActions from '../actions/category';

/**
 * Component with the list of available categories.
 *
 * @module components/CategoryList
 * @author Sara Hernández <sara.her.su@gmail.com>
 */
class CategoryList extends Component {

  componentWillMount () {
    this.props.actions.fetchCategories();
  }

  render () {
    return (
      <ul>
        <li><Link to="/">All</Link></li>
        {this.props.categories.map((category) => (
          <li key={category.path}>
            <Link to={`/category/${category.path}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: () => dispatch(CategoryActions.fetchCategories())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
