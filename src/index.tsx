import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from 'components/Firebase';

const ROOT_COMPONENT = 'root';
const firebase = new Firebase();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <FirebaseContext.Provider value={firebase}>
        <App />
      </FirebaseContext.Provider>
    </HashRouter>
  </Provider>,
  document.getElementById(ROOT_COMPONENT)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
