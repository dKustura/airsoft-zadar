import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Components
import {
  Container,
  Grid,
  Typography,
  Button,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

// Helpers
import messages from './messages';
import { RootState } from 'types';
import { selectAuthUser } from './selectors';
import { Routes } from 'helpers/constants';
import styles from './styles';

const authUserSelector = (state: RootState) => selectAuthUser(state);

interface Props extends WithStyles<typeof styles> {}

const EmailConfirmation: React.FC<Props> = ({ classes }) => {
  const authUser = useSelector(authUserSelector);
  const isEmailConfirmed = authUser?.emailVerified;
  const history = useHistory();

  const handleContinueClick = useCallback(() => {
    history.push(Routes.HOME);
  }, [history]);

  return (
    <Container maxWidth="md">
      {isEmailConfirmed ? (
        <Grid container justify="center" alignItems="center" spacing={4}>
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
          <Grid item className={classes.centeredText}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinueClick}
            >
              <FormattedMessage {...messages.continueButton} />
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item className={classes.centeredText}>
            <Typography variant="h1">
              <FormattedMessage {...messages.oneMoreStep} />
            </Typography>
          </Grid>
          <Grid item className={classes.centeredText}>
            <Typography variant="h4">
              <FormattedMessage
                {...messages.confirmationEmailSent}
                values={{ email: authUser?.email }}
              />
            </Typography>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default withStyles(styles)(EmailConfirmation);
