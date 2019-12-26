import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getTheme } from 'components/Theme';
import Home from 'components/Home';
import SignUp from 'components/SignUp';
import SignIn from 'components/SignIn';
import Header from 'components/Header';
import AddAdmin from 'components/AddAdmin';

import { SnackbarProvider, WithSnackbarProps } from 'notistack';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { RootState } from 'types';

import { selectThemeMode, selectAuthUser } from './selectors';
import {
  withAuthentication,
  WithAuthenticationProps,
} from 'components/Session';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  WithAuthenticationProps;

const notistackRef = React.createRef<WithSnackbarProps>();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current?.closeSnackbar(key);
};

const App: React.FC<Props> = ({ theme, authUser }: Props) => {
  return (
    <MuiThemeProvider theme={getTheme(theme)}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        action={key => (
          <IconButton
            onClick={onClickDismiss(key)}
            size="small"
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        )}
      >
        <CssBaseline />
        <Helmet>
          <title>Airsoft Klub Zadar</title>
        </Helmet>

        <Header />

        <Switch>
          {authUser && <Redirect from="/signUp" to="/" />}
          {authUser && <Redirect from="/signIn" to="/" />}
          <Route path="/addAdmin" component={AddAdmin} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/" component={Home} />
        </Switch>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return { theme: selectThemeMode(state), authUser: selectAuthUser(state) };
};

const mapDispatchToProps = {};

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
