import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { compose } from 'redux';

// Actions
import { toggleTheme } from 'actions/theme';

// Components
import {
  withStyles,
  WithStyles,
  Button,
  Grid,
  Link,
  Container,
  IconButton,
} from '@material-ui/core';
import SunIcon from '@material-ui/icons/Brightness7';
import MoonIcon from '@material-ui/icons/Brightness2';
import { withFirebase, WithFirebaseProps } from 'components/Firebase';

import styles from './styles';
// import logo from 'logo.png';

// Helpers
import { ThemeMode } from 'reducers/constants';
import { MaterialRouterLink } from 'helpers';
import { successNotification, errorNotification } from 'helpers/snackbar';

// Selectors
import {
  selectThemeMode,
  selectAuthUser,
  selectUserDisplayName,
} from './selectors';

// Types
import { RootState } from 'types';
import { FirebaseError } from 'firebase';

interface OwnProps extends WithStyles<typeof styles>, WithFirebaseProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  WithSnackbarProps;

const Header: React.FC<Props> = ({
  classes,
  theme,
  authUser,
  displayName,
  toggleTheme,
  firebase,
  enqueueSnackbar,
}) => {
  return (
    <div className={classes.headerContainer}>
      <Container maxWidth="xl">
        <Grid container spacing={1} justify="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              {/* <Grid item>
                <img src={logo} alt="logo" />
              </Grid> */}
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/"
                >
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/blog"
                >
                  Blog
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/about"
                >
                  About
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <IconButton
                  aria-label="toggle theme"
                  color="inherit"
                  title="Toggle theme"
                  onClick={() => toggleTheme()}
                >
                  {theme === ThemeMode.Light ? <MoonIcon /> : <SunIcon />}
                </IconButton>
              </Grid>
              {!authUser ? (
                <>
                  <Grid item>
                    <Button
                      aria-label="sign up"
                      variant="outlined"
                      color="inherit"
                      component={MaterialRouterLink}
                      to="/signUp"
                    >
                      Sign up
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      aria-label="sign in"
                      variant="outlined"
                      color="inherit"
                      component={MaterialRouterLink}
                      to="/signIn"
                    >
                      Log In
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item>{displayName}</Grid>
                  <Grid item>
                    <Button
                      aria-label="sign up"
                      variant="outlined"
                      color="inherit"
                      onClick={() =>
                        firebase
                          .doSignOut()
                          .then(() => {
                            enqueueSnackbar('Signed out.', successNotification);
                          })
                          .catch((error: FirebaseError) => {
                            enqueueSnackbar(error.message, errorNotification);
                          })
                      }
                    >
                      Sign out
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  console.log(
    'JSON.stringify(selectAuthUser(state))',
    JSON.stringify(selectAuthUser(state))
  );
  return {
    theme: selectThemeMode(state),
    authUser: selectAuthUser(state),
    displayName: selectUserDisplayName(state),
  };
};

const mapDispatchToProps = { toggleTheme };

export default compose<any>(
  withFirebase,
  withSnackbar,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
