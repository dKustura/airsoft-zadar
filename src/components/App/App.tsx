import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CookieConsent from 'react-cookie-consent';
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
import Contact from 'components/Contact';
import CookiePolicy from 'components/CookiePolicy';
import EmailConfirmation from 'components/EmailConfirmation';

// Other Componenets
import {
  IconButton,
  useMediaQuery,
  Theme,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BurgerMenu from 'components/BurgerMenu';
import CookieBannerButton from './CookieBannerButton';
import LinkButton from 'components/LinkButton';

// Types
import { RootState } from 'types';

// Helpers
import { useStyles } from './styles';
import { useFirebase } from 'components/Firebase';
import { selectThemeMode, selectAuthUser } from './selectors';
import {
  withAuthentication,
  WithAuthenticationProps,
} from 'components/Session';
import { Routes } from 'helpers/constants';
import { formatMessage } from 'helpers/intl';
import messages from './messages';
import Settings from 'components/Settings';

interface OwnProps {}

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  WithAuthenticationProps;

const notistackRef = React.createRef<WithSnackbarProps>();
const onClickDismiss = (key: string | number | undefined) => () => {
  notistackRef.current?.closeSnackbar(key);
};

const App = ({ authUser }: Props): JSX.Element => {
  const classes = useStyles();
  const location = useLocation();
  const firebase = useFirebase();
  const intl = useIntl();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const onCookiesAccept = () => {
    firebase.addAnalytics();
  };

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
        <title>{formatMessage(intl, messages.siteTitle)}</title>
      </Helmet>

      <CookieConsent
        enableDeclineButton
        buttonText={<FormattedMessage {...messages.acceptCookiesLabel} />}
        declineButtonText={
          <FormattedMessage {...messages.declineCookiesLabel} />
        }
        onAccept={onCookiesAccept}
        ButtonComponent={CookieBannerButton}
        ariaAcceptLabel={formatMessage(intl, messages.acceptCookiesAria)}
        ariaDeclineLabel={formatMessage(intl, messages.declineCookiesAria)}
        containerClasses={classes.cookieBanner}
        contentClasses={classes.cookieBannerContent}
        buttonClasses={classes.cookieBannerAcceptButton}
        declineButtonClasses={classes.cookieBannerDeclineButton}
        buttonWrapperClasses={classes.cookieBannerButtonContainer}
        disableButtonStyles
        disableStyles
      >
        <Typography component="span">
          <div className={classes.cookieBannerText}>
            <FormattedMessage {...messages.cookieBanner} />
          </div>
          {location.pathname !== Routes.COOKIE_POLICY && (
            <div className={classes.learnMoreLink}>
              <LinkButton variant="body1" to={Routes.COOKIE_POLICY}>
                <FormattedMessage {...messages.cookieBannerLearnMore} />
              </LinkButton>
            </div>
          )}
        </Typography>
      </CookieConsent>

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

          <Route path={Routes.COOKIE_POLICY} component={CookiePolicy} />
          <Route path={Routes.ABOUT} component={About} />
          <Route path={Routes.CONTACT} component={Contact} />
          <Route path={Routes.POST} component={PostRoute} />
          <Route path={Routes.ADD_ADMIN} component={AddAdmin} />
          <Route path={Routes.SETTINGS} component={Settings} />
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
