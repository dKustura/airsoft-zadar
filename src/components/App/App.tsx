import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
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
import EmailAction from 'components/EmailAction';
import PostRoute from 'components/PostRoute';
import About from 'components/About';

// Other Componenets
import { IconButton, useMediaQuery, Theme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Types
import { RootState } from 'types';

// Helpers
import { useStyles } from './styles';
import { selectThemeMode, selectAuthUser } from './selectors';
import {
  withAuthentication,
  WithAuthenticationProps,
} from 'components/Session';
import { Routes } from 'helpers/constants';
import EmailConfirmation from 'components/EmailConfirmation';
import BurgerMenu from 'components/BurgerMenu';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  WithAuthenticationProps;

const notistackRef = React.createRef<WithSnackbarProps>();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current?.closeSnackbar(key);
};

const App: React.FC<Props> = ({ authUser }) => {
  const classes = useStyles();
  const location = useLocation();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

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

      <div
        className={classnames({
          'parallax-wrapper':
            location.pathname === Routes.HOME ||
            location.pathname === Routes.ABOUT,
        })}
      >
        {isSmallScreen ? <BurgerMenu /> : <Header />}

        <Switch>
          {authUser && <Redirect from={Routes.SIGN_IN} to={Routes.HOME} />}
          {!authUser && (
            <Redirect from={Routes.EMAIL_CONFIRMATION} to={Routes.HOME} />
          )}
          {!authUser && <Redirect from={Routes.ADD_ADMIN} to={Routes.HOME} />}
          {!authUser && <Redirect from={Routes.POST_NEW} to={Routes.HOME} />}

          <Route path={Routes.ABOUT} component={About} />
          <Route path={Routes.POST} component={PostRoute} />
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
  connect(mapStateToProps, mapDispatchToProps)(App)
);
