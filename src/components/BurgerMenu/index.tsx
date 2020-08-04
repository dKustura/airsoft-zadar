import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import classnames from 'classnames';
import './index.scss';

// Actions
import { toggleTheme } from 'actions/theme';
import { setLocale } from 'actions/locale';

// Components
import { Grid, Button, Tooltip, Zoom, IconButton } from '@material-ui/core';
import SunIcon from '@material-ui/icons/Brightness7';
import MoonIcon from '@material-ui/icons/Brightness2';
import BurgerMenuIcon from 'components/BurgerMenuIcon';
import UnderlinedLink from 'components/UnderlinedLink';
import UserMenu from 'components/UserMenu';
import LocaleMenu from 'components/LocaleMenu';

// Selectors
import {
  selectThemeMode,
  selectAuthUser,
  selectUserDisplayName,
  selectLocale,
} from './selectors';

// Helpers
import { useStyles } from './styles';
import { Routes } from 'helpers/constants';
import messages from './messages';
import { MaterialRouterLink } from 'helpers';
import { RootState } from 'types';
import { ThemeMode } from 'reducers/constants';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const BurgerMenu: React.FC<Props> = ({
  authUser,
  displayName,
  locale,
  theme,
  toggleTheme,
  setLocale,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();
  const classes = useStyles();

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
          <UnderlinedLink to="/blog" variant="h4">
            <FormattedMessage {...messages.blogLink} />
          </UnderlinedLink>
        </Grid>
        <Grid item>
          <UnderlinedLink to="/about" variant="h4">
            <FormattedMessage {...messages.aboutLink} />
          </UnderlinedLink>
        </Grid>
        <Grid item>
          <UnderlinedLink to={Routes.ADD_ADMIN} variant="h4">
            Add Admin
          </UnderlinedLink>
        </Grid>
        <Grid item>
          <UnderlinedLink to={Routes.POST_FORM} variant="h4">
            <FormattedMessage {...messages.newPostLink} />
          </UnderlinedLink>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
