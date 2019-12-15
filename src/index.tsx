import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store';

import { HashRouter } from 'react-router-dom';
import Firebase, { FirebaseProvider } from 'components/Firebase';
import { SnackbarProvider, WithSnackbarProps } from 'notistack';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const ROOT_COMPONENT = 'root';
const firebase = new Firebase();

const notistackRef = React.createRef<WithSnackbarProps>();
const onClickDismiss = (key: string | number | undefined) => () => {
  if (notistackRef.current) {
    notistackRef.current.closeSnackbar(key);
  }
};

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <FirebaseProvider value={firebase}>
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={2}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          action={key => (
            <IconButton onClick={onClickDismiss(key)} size="small">
              <CloseIcon />
            </IconButton>
          )}
        >
          <App />
        </SnackbarProvider>
      </FirebaseProvider>
    </HashRouter>
  </Provider>,
  document.getElementById(ROOT_COMPONENT)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
