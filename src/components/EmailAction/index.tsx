import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { MessageDescriptor, useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

// Components
import { useFirebase } from 'components/Firebase';

// Styling
import styles from './styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';

// Helpers
import { EmailActionParameter, EmailActionMode } from './constants';
import EmailConfirmation from 'components/EmailConfirmation';
import { successNotification, warningNotification } from 'helpers/snackbar';
import messages from './messages';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Props extends WithStyles<typeof styles> {}

const EmailAction: React.FC<Props> = () => {
  const firebase = useFirebase();
  const query = useQuery();
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const mode = query.get(EmailActionParameter.mode);
  const actionCode = query.get(EmailActionParameter.oobCode);
  const apiKey = query.get(EmailActionParameter.apiKey);
  const continueUrl = query.get(EmailActionParameter.continueUrl);
  const lang = query.get(EmailActionParameter.lang);

  const redirectToContinueUrl = useCallback(() => {
    const homeUrl = '/';
    const redirectUrl = continueUrl || homeUrl;
    history.push(redirectUrl);
  }, [history, continueUrl]);

  const handleVerifyEmail = useCallback(() => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Try to apply the email verification code.
    if (!actionCode || !apiKey || !continueUrl || !lang) {
      redirectToContinueUrl();
    } else {
      firebase.auth
        .applyActionCode(actionCode)
        .then(function (resp) {
          // Email address has been verified.
          // TODO: Display a confirmation message to the user.
          // You could also provide the user with a link back to the app.
          // TODO: If a continue URL is available, display a button which on
          // click redirects the user back to the app via continueUrl with
          // additional state determined from that URL's parameters.
          firebase.auth.currentUser?.reload();
          enqueueSnackbar(
            intl.formatMessage(
              messages.emailSuccessfullyConfirmed as MessageDescriptor
            ),
            successNotification
          );
          redirectToContinueUrl();
        })
        .catch((error) => {
          enqueueSnackbar(
            intl.formatMessage(
              messages.emailConfirmationCodeExpired as MessageDescriptor
            ),
            warningNotification
          );
          redirectToContinueUrl();
        });
    }
  }, [
    firebase.auth,
    actionCode,
    apiKey,
    continueUrl,
    lang,
    redirectToContinueUrl,
    intl,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    switch (mode) {
      case EmailActionMode.verifyEmail:
        // Display email verification handler and UI.
        handleVerifyEmail();
        break;
      default:
        redirectToContinueUrl();
        break;
    }
  }, [mode, handleVerifyEmail, redirectToContinueUrl]);

  return <>{mode === EmailActionMode.verifyEmail && <EmailConfirmation />}</>;
};

export default withStyles(styles)(EmailAction);
