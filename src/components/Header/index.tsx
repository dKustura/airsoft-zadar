import * as React from 'react';
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
  Container,
  IconButton,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import SunIcon from '@material-ui/icons/Brightness7';
import MoonIcon from '@material-ui/icons/Brightness2';
import UserMenu from 'components/UserMenu';
import LocaleMenu from 'components/LocaleMenu';
import UnderlinedLink from 'components/UnderlinedLink';

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
  selectLocale,
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
  locale,
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
                <UnderlinedLink to="/">
                  <FormattedMessage {...messages.homeLink} />
                </UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to="/blog">
                  <FormattedMessage {...messages.blogLink} />
                </UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to="/about">
                  <FormattedMessage {...messages.aboutLink} />
                </UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to="/addAdmin">Add Admin</UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to="/post">
                  <FormattedMessage {...messages.newPostLink} />
                </UnderlinedLink>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <LocaleMenu
                  languageCode={locale}
                  onChange={(locale) => setLocale(locale)}
                />
              </Grid>
              <Grid item>
                <Tooltip TransitionComponent={Zoom} title="Toggle theme">
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
    locale: selectLocale(state),
  };
};

const mapDispatchToProps = { toggleTheme, setLocale };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
