import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import postReducer from './main/reducers/post';
import commentReducer from './main/reducers/comment';
import categoryReducer from './main/reducers/category';

import App from './main/App';

import './res/styles/index.css';

const rootReducer = combineReducers({
  ...postReducer,
  ...commentReducer,
  ...categoryReducer
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
