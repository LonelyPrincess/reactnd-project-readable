import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './main/App';
import postReducer from './main/reducers/post';
import commentReducer from './main/reducers/comment';
import categoryReducer from './main/reducers/category';
import { activePostReducer, activeSortCriteriaReducer } from './main/reducers/post';
import { activeCommentReducer } from './main/reducers/comment';

import './res/styles/index.css';

const rootReducer = combineReducers({
  postReducer,
  commentReducer,
  categoryReducer,
  activePostReducer,
  activeCommentReducer,
  activeSortCriteriaReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
