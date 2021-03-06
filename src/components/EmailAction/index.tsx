import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { MessageDescriptor, useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';

// Components
import { useFirebase } from 'components/Firebase';

// Helpers
import { EmailActionParameter, EmailActionMode } from './constants';
import EmailConfirmation from 'components/EmailConfirmation';
import { warningNotification } from 'helpers/snackbar';
import messages from './messages';
import { Routes } from 'helpers/constants';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailAction = (): JSX.Element => {
  const firebase = useFirebase();
  const query = useQuery();
  const history = useHistory();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);

  const mode = query.get(EmailActionParameter.mode);
  const actionCode = query.get(EmailActionParameter.oobCode);
  const apiKey = query.get(EmailActionParameter.apiKey);
  const continueUrl = query.get(EmailActionParameter.continueUrl);
  // const lang = query.get(EmailActionParameter.lang);

  const redirectToContinueUrl = useCallback(() => {
    const redirectUrl = continueUrl || Routes.HOME;
    history.push(redirectUrl);
  }, [history, continueUrl]);

  const handleVerifyEmail = useCallback(() => {
    setIsConfirmingEmail(true);
    // TODO:
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Try to apply the email verification code.
    if (!actionCode || !apiKey) {
      enqueueSnackbar(
        intl.formatMessage(
          messages.emailConfirmationUriInvalid as MessageDescriptor
        ),
        warningNotification
      );
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
          setIsEmailConfirmed(true);
          setIsConfirmingEmail(false);
          firebase.auth.currentUser?.reload();
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

  return (
    <>
      {mode === EmailActionMode.verifyEmail && (
        <EmailConfirmation
          isConfirmed={isEmailConfirmed}
          isLoading={isConfirmingEmail}
        />
      )}
    </>
  );
};

export default EmailAction;
