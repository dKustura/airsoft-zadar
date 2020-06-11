import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.scss';

// Providers
import { SnackbarProvider, WithSnackbarProps } from 'notistack';
import CssBaseline from '@material-ui/core/CssBaseline';

// Page Componenets
import Home from 'components/Home';
import SignUp from 'components/SignUp';
import SignIn from 'components/SignIn';
import Header from 'components/Header';
import AddAdmin from 'components/AddAdmin';
import PostForm from 'components/PostForm';
import EmailAction from 'components/EmailAction';

// Other Componenets
import { IconButton, withStyles, WithStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Types
import { RootState } from 'types';

// Helpers
import { selectThemeMode, selectAuthUser } from './selectors';
import {
  withAuthentication,
  WithAuthenticationProps,
} from 'components/Session';
import styles from './styles';
import { Routes } from 'helpers/constants';
import EmailConfirmation from 'components/EmailConfirmation';

interface OwnProps extends WithStyles<typeof styles> {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  WithAuthenticationProps;

const notistackRef = React.createRef<WithSnackbarProps>();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current?.closeSnackbar(key);
};

const App = ({ authUser, classes }: Props) => {
  return (
    <SnackbarProvider
      ref={notistackRef}
      maxSnack={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      action={(key) => (
        <IconButton onClick={onClickDismiss(key)} color="inherit">
          <CloseIcon />
        </IconButton>
      )}
      classes={{
        variantSuccess: classes.successSnackbar,
        variantError: classes.errorSnackbar,
        variantWarning: classes.warningSnackbar,
        variantInfo: classes.infoSnackbar,
      }}
    >
      <CssBaseline />
      <Helmet>
        <title>Airsoft Klub Zadar</title>
      </Helmet>

      <div className="wrapper">
        <Header />

        <Switch>
          {authUser && <Redirect from={Routes.SIGN_IN} to={Routes.HOME} />}
          {!authUser && (
            <Redirect from={Routes.EMAIL_CONFIRMATION} to={Routes.HOME} />
          )}
          <Route path={Routes.POST_FORM} component={PostForm} />
          <Route path={Routes.ADD_ADMIN} component={AddAdmin} />
          <Route path={Routes.SIGN_UP} component={SignUp} />
          <Route path={Routes.SIGN_IN} component={SignIn} />
          <Route
            path={Routes.EMAIL_CONFIRMATION}
            component={EmailConfirmation}
          />
          <Route path={Routes.EMAIL_ACTION} component={EmailAction} />
          <Route path={Routes.HOME} component={Home} />
        </Switch>
      </div>
    </SnackbarProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    theme: selectThemeMode(state),
    authUser: selectAuthUser(state),
  };
};

const mapDispatchToProps = {};

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
);
