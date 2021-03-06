import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import { useLocale } from 'components/Locale';

// Actions
import { toggleTheme } from 'actions/theme';

// Components
import {
  Button,
  Grid,
  Container,
  IconButton,
  Tooltip,
  Zoom,
} from '@material-ui/core';
import SunIcon from '@material-ui/icons/WbSunny';
import MoonIcon from '@material-ui/icons/NightsStay';
import UserMenu from 'components/UserMenu';
import LocaleMenu from 'components/LocaleMenu';
import UnderlinedLink from 'components/UnderlinedLink';

// import logo from 'logo.png';

// Helpers
import { useStyles } from './styles';
import { ThemeMode } from 'reducers/constants';
import { MaterialRouterLink } from 'helpers';
import { Routes } from 'helpers/constants';

// Selectors
import {
  selectThemeMode,
  selectAuthUser,
  selectUserDisplayName,
} from './selectors';

// Types
import { RootState } from 'types';
import messages from './messages';
import { UserRole } from 'helpers/roles';
import AuthorizationCheck from 'components/AuthorizationCheck';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header = ({
  theme,
  authUser,
  displayName,
  toggleTheme,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const [locale, setLocale] = useLocale();

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
                <UnderlinedLink to={Routes.HOME}>
                  <FormattedMessage {...messages.homeLink} />
                </UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to={Routes.ABOUT}>
                  <FormattedMessage {...messages.aboutLink} />
                </UnderlinedLink>
              </Grid>
              <Grid item>
                <UnderlinedLink to={Routes.CONTACT}>
                  <FormattedMessage {...messages.contactLink} />
                </UnderlinedLink>
              </Grid>
              {/* <AuthorizationCheck
                userRoles={authUser?.roles}
                authorizedRoles={[UserRole.Admin]}
              >
                <Grid item>
                  <UnderlinedLink to={Routes.ADD_ADMIN}>
                    Add Admin
                  </UnderlinedLink>
                </Grid>
              </AuthorizationCheck> */}

              <AuthorizationCheck
                userRoles={authUser?.roles}
                authorizedRoles={[UserRole.Admin]}
              >
                <Grid item>
                  <UnderlinedLink to={Routes.POST_NEW}>
                    <FormattedMessage {...messages.newPostLink} />
                  </UnderlinedLink>
                </Grid>
              </AuthorizationCheck>
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
                <Tooltip
                  TransitionComponent={Zoom}
                  title={intl.formatMessage(
                    messages.toggleTheme as MessageDescriptor
                  )}
                >
                  <IconButton
                    aria-label="toggle theme"
                    color="inherit"
                    onClick={() => toggleTheme()}
                  >
                    {theme === ThemeMode.Light ? <SunIcon /> : <MoonIcon />}
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
                      to={Routes.SIGN_UP}
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
                      to={Routes.SIGN_IN}
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

const mapDispatchToProps = { toggleTheme };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
