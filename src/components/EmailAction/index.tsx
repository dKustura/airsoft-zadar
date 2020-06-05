import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Components
import { withFirebase, WithFirebaseProps } from 'components/Firebase';

// Styling
import styles from './styles';
import { withStyles, WithStyles } from '@material-ui/core/styles';

// Helpers
import { EmailActionParameter, EmailActionMode } from './constants';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Props extends WithStyles<typeof styles>, WithFirebaseProps {}

const EmailAction: React.FC<Props> = ({ firebase }) => {
  const query = useQuery();
  const history = useHistory();

  const mode = query.get(EmailActionParameter.mode);
  const actionCode = query.get(EmailActionParameter.oobCode);
  const apiKey = query.get(EmailActionParameter.apiKey);
  const continueUrl = query.get(EmailActionParameter.continueUrl);
  const lang = query.get(EmailActionParameter.lang);

  const redirectToHomepage = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleVerifyEmail = useCallback(() => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.

    // Try to apply the email verification code.
    if (!actionCode || !apiKey || !continueUrl || !lang) {
      redirectToHomepage();
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
          redirectToHomepage();
        })
        .catch((error) => {
          // Code is invalid or expired. Ask the user to verify their email address
          // again.
          console.log('error', error);
        });
    }
  }, [
    firebase.auth,
    actionCode,
    apiKey,
    continueUrl,
    lang,
    redirectToHomepage,
  ]);

  useEffect(() => {
    switch (mode) {
      case EmailActionMode.verifyEmail:
        // Display email verification handler and UI.
        handleVerifyEmail();
        break;
      default:
        redirectToHomepage();
        break;
    }
  }, [mode, handleVerifyEmail, redirectToHomepage]);

  return <div>Email Action Page</div>;
};

export default withFirebase(withStyles(styles)(EmailAction));
