import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

import { Provider } from 'react-redux';
import store from '../../store';

import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseProvider } from 'components/Firebase';

const firebase = new Firebase();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <FirebaseProvider value={firebase}>
          <App />
        </FirebaseProvider>
      </HashRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
