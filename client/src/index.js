import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './main/App';
import reducer from './main/reducers/post';

import './res/styles/index.css';

// Make our app compatible with Redux DevTools for Chrome
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
  reducer,
  reduxDevTools && reduxDevTools()
);

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
