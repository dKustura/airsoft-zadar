import * as React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import { HashRouter } from 'react-router-dom';
import { FirebaseInstance, FirebaseProvider } from 'components/Firebase';
import { LocaleProvider } from 'components/Locale';

const ROOT_COMPONENT = 'root';
const firebase = FirebaseInstance;

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <FirebaseProvider value={firebase}>
        <LocaleProvider>
          <App />
        </LocaleProvider>
      </FirebaseProvider>
    </HashRouter>
  </Provider>,
  document.getElementById(ROOT_COMPONENT)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
