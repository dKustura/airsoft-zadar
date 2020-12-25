import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import classnames from 'classnames';
import './index.scss';
import { useLocale } from 'components/Locale';

// Actions
import { toggleTheme } from 'actions/theme';

// Components
import { Grid, Button, Tooltip, Zoom, IconButton } from '@material-ui/core';
import SunIcon from '@material-ui/icons/WbSunny';
import MoonIcon from '@material-ui/icons/NightsStay';
import BurgerMenuIcon from 'components/BurgerMenuIcon';
import UnderlinedLink from 'components/UnderlinedLink';
import UserMenu from 'components/UserMenu';
import LocaleMenu from 'components/LocaleMenu';
import AuthorizationCheck from 'components/AuthorizationCheck';

// Selectors
import {
  selectThemeMode,
  selectAuthUser,
  selectUserDisplayName,
} from './selectors';

// Helpers
import { useStyles } from './styles';
import { Routes } from 'helpers/constants';
import messages from './messages';
import { MaterialRouterLink } from 'helpers';
import { RootState } from 'types';
import { ThemeMode } from 'reducers/constants';
import { UserRole } from 'helpers/roles';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const BurgerMenu: React.FC<Props> = ({
  authUser,
  displayName,
  theme,
  toggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();
  const classes = useStyles();
  const [locale, setLocale] = useLocale();

  const toggleOpen = () => setIsOpen(!isOpen);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className={classes.container}>
      <div
        className={classnames(classes.burgerMenu, {
          [classes.burgerMenuActive]: isOpen,
        })}
      />
      <BurgerMenuIcon isActive={isOpen} onClick={toggleOpen} />

      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        direction="column"
        className={classnames(classes.menuOptions, {
          [classes.menuOptionsVisible]: isOpen,
        })}
      >
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
              <UserMenu displayName={displayName} typographyVariant="h4" />
            </Grid>
          )
        )}

        <Grid item>
          <UnderlinedLink to={Routes.HOME} variant="h4">
            <FormattedMessage {...messages.homeLink} />
          </UnderlinedLink>
        </Grid>
        <Grid item>
          <UnderlinedLink to={Routes.ABOUT} variant="h4">
            <FormattedMessage {...messages.aboutLink} />
          </UnderlinedLink>
        </Grid>
        {/* <AuthorizationCheck
          userRoles={authUser?.roles}
          authorizedRoles={[UserRole.Admin]}
        >
          <Grid item>
            <UnderlinedLink to={Routes.ADD_ADMIN} variant="h4">
              Add Admin
            </UnderlinedLink>
          </Grid>
        </AuthorizationCheck> */}
        <AuthorizationCheck
          userRoles={authUser?.roles}
          authorizedRoles={[UserRole.Admin]}
        >
          <Grid item>
            <UnderlinedLink to={Routes.POST_NEW} variant="h4">
              <FormattedMessage {...messages.newPostLink} />
            </UnderlinedLink>
          </Grid>
        </AuthorizationCheck>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
