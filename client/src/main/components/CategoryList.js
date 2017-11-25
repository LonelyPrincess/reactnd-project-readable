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
    const { actions, categories, activeCategory } = this.props;

    return (
      <ul>
        <li className={!activeCategory ? 'active' : ''}>
          <i className="fa fa-fw fa-tag"></i>
          <Link to="/" onClick={() => actions.setActiveCategory(null)}>All</Link>
        </li>
        {categories.map((category) => (
          <li key={category.path} className={category.path === activeCategory ? 'active' : ''}>
            <i className="fa fa-fw fa-tag"></i>
            <Link to={`/${category.path}`} onClick={() => actions.setActiveCategory(category)}>{category.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return {
    categories: state.categoryReducer.list,
    activeCategory: state.categoryReducer.active
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: () => dispatch(CategoryActions.fetchCategories()),
      setActiveCategory: (category) => dispatch(CategoryActions.setActiveCategory(category ? category.path : null))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
