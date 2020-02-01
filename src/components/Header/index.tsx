import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Actions
import { toggleTheme } from 'actions/theme';
import { setLocale } from 'actions/locale';

// Components
import {
  withStyles,
  WithStyles,
  Button,
  Grid,
  Link,
  Container,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import SunIcon from '@material-ui/icons/Brightness7';
import MoonIcon from '@material-ui/icons/Brightness2';
import UserMenu from 'components/UserMenu';
import LocaleMenu from 'components/LocaleMenu';

import styles from './styles';
// import logo from 'logo.png';

// Helpers
import { ThemeMode } from 'reducers/constants';
import { MaterialRouterLink } from 'helpers';

// Selectors
import {
  selectThemeMode,
  selectAuthUser,
  selectUserDisplayName,
} from './selectors';

// Types
import { RootState } from 'types';
import messages from './messages';

interface OwnProps extends WithStyles<typeof styles> {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: React.FC<Props> = ({
  classes,
  theme,
  authUser,
  displayName,
  toggleTheme,
  setLocale,
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
                  <FormattedMessage {...messages.homeLink} />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/blog"
                >
                  <FormattedMessage {...messages.blogLink} />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/about"
                >
                  <FormattedMessage {...messages.aboutLink} />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/addAdmin"
                >
                  Add Admin
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component={MaterialRouterLink}
                  variant="h6"
                  color="inherit"
                  to="/post"
                >
                  <FormattedMessage {...messages.newPostLink} />
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <LocaleMenu />
              </Grid>
              <Grid item>
                <Tooltip title="Toggle theme">
                  <IconButton
                    aria-label="toggle theme"
                    color="inherit"
                    onClick={() => toggleTheme()}
                  >
                    {theme === ThemeMode.Light ? <MoonIcon /> : <SunIcon />}
                  </IconButton>
                </Tooltip>
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
                      <FormattedMessage {...messages.signUpButton} />
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
                      <FormattedMessage {...messages.logInButton} />
                    </Button>
                  </Grid>
                </>
              ) : (
                displayName && (
                  <Grid item>
                    <UserMenu displayName={displayName} />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    theme: selectThemeMode(state),
    authUser: selectAuthUser(state),
    displayName: selectUserDisplayName(state),
  };
};

const mapDispatchToProps = { toggleTheme, setLocale };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
