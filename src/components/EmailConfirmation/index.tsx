import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Components
import {
  Container,
  Grid,
  Typography,
  Button,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { useFirebase } from 'components/Firebase';

// Helpers
import messages from './messages';
import { authUserSelector, localeSelector } from './selectors';
import { Routes } from 'helpers/constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const EmailConfirmation: React.FC<Props> = ({ classes }) => {
  const firebase = useFirebase();
  const history = useHistory();
  const authUser = useSelector(authUserSelector);
  const locale = useSelector(localeSelector);
  const isEmailConfirmed = authUser?.emailVerified;

  const handleContinueClick = useCallback(() => {
    history.push(Routes.HOME);
  }, [history]);

  const handleResendConfirmationEmailClick = useCallback(() => {
    firebase.doSendEmailVerification(locale);
  }, [firebase, locale]);

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center" spacing={4}>
        {isEmailConfirmed ? (
          <>
            <Grid item className={classes.centeredText}>
              <Typography variant="h1">
                <FormattedMessage {...messages.emailConfirmedTitle} />
              </Typography>
            </Grid>
            <Grid item className={classes.centeredText}>
              <Typography variant="h5">
                <FormattedMessage {...messages.emailConfirmedMessage} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleContinueClick}
                fullWidth
              >
                <FormattedMessage {...messages.continueButton} />
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item className={classes.centeredText}>
              <Typography variant="h1">
                <FormattedMessage {...messages.oneMoreStep} />
              </Typography>
            </Grid>
            <Grid item className={classes.centeredText}>
              <Typography variant="h4">
                <FormattedMessage {...messages.confirmationEmailSent} />
              </Typography>
              <Typography className={classes.email} variant="h4">
                {authUser?.email}
              </Typography>
              <Typography variant="h4">
                <FormattedMessage {...messages.pleaseCheckEmail} />
              </Typography>
            </Grid>

            <Grid item className={classes.centeredText}>
              <Typography variant="h6">
                <FormattedMessage {...messages.emailNotReceivedMessage} />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResendConfirmationEmailClick}
                fullWidth
              >
                <FormattedMessage {...messages.resendButton} />
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(EmailConfirmation);
