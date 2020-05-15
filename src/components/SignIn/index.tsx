import * as React from 'react';
import { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { withFirebase, WithFirebaseProps } from 'components/Firebase';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Components
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Copyright from 'components/Copyright';

// Styling
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

// Helpers
import { INITIAL_SIGNIN_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';
import { MaterialRouterLink } from 'helpers';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, useIntl, MessageDescriptor } from 'react-intl';
import messages from './messages';

interface Props
  extends WithStyles<typeof styles>,
    WithFirebaseProps,
    WithSnackbarProps {}

const SignIn: React.FC<Props> = ({
  classes,
  firebase,
  enqueueSnackbar,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const intl = useIntl();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.signIn} />
        </Typography>
        <Formik
          initialValues={INITIAL_SIGNIN_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .doSignInWithEmailAndPassword(values.email, values.password)
              .then((credentials) => {
                enqueueSnackbar(
                  'You logged in successfully!',
                  successNotification
                );
              })
              .catch((error: FirebaseError) => {
                setIsLoading(false);
                actions.setSubmitting(false);
                enqueueSnackbar(error.message, errorNotification);
              });
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label={intl.formatMessage(
                      messages.emailAddressLabel as MessageDescriptor
                    )}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="email"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    label={intl.formatMessage(
                      messages.passwordLabel as MessageDescriptor
                    )}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="current-password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isLoading}
                    fullWidth
                  >
                    {isLoading ? (
                      <CircularProgress
                        color="secondary"
                        size={24}
                        thickness={6}
                      />
                    ) : (
                      <FormattedMessage {...messages.logInButton} />
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item className={classes.social}>
                  <Typography component="span" className={classes.socialSpan}>
                    <FormattedMessage {...messages.orUseSocialLogin} />
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item>
                  <IconButton>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container justify="space-between">
                <Grid item>
                  <Link
                    component={MaterialRouterLink}
                    to="/resetPassword"
                    variant="body2"
                  >
                    <FormattedMessage {...messages.forgotPasswordQuestion} />
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={MaterialRouterLink}
                    to="/signUp"
                    variant="body2"
                  >
                    <FormattedMessage {...messages.dontHaveAccountQuestion} />
                  </Link>
                </Grid>
              </Grid>

              <Grid container justify="center" className={classes.copyright}>
                <Grid item>
                  <Copyright />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default compose<any>(
  withFirebase,
  withSnackbar
)(withStyles(styles)(SignIn));
