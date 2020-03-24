import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

import { withFirebase, WithFirebaseProps } from 'components/Firebase';
import { withSnackbar, WithSnackbarProps } from 'notistack';

// Actions
import { setAuthUser } from 'actions/session';

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
import { INITIAL_SIGNUP_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';
import { MaterialRouterLink } from 'helpers';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import messages from './messages';

type Props = WithStyles<typeof styles> &
  WithFirebaseProps &
  WithSnackbarProps &
  typeof mapDispatchToProps;

const SignUp: React.FC<Props> = ({
  classes,
  firebase,
  enqueueSnackbar,
  setAuthUser,
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
          <FormattedMessage {...messages.createAccount} />
        </Typography>
        <Formik
          initialValues={INITIAL_SIGNUP_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            firebase
              .doCreateUserWithEmailAndPassword(values.email, values.password)
              .then(credentials => {
                credentials.user
                  ?.updateProfile({
                    displayName: `${values.firstName} ${values.lastName}`,
                  })
                  .then(() => {
                    setAuthUser(credentials.user);
                    enqueueSnackbar(
                      'You signed up successfully!',
                      successNotification
                    );

                    // TODO: Set email language based on selected locale
                    // firebase.auth.languageCode = 'hr';
                    credentials.user?.sendEmailVerification();
                  });
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label={intl.formatMessage(
                      messages.firstNameLabel as MessageDescriptor
                    )}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="fname"
                    fullWidth
                    autoFocus
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label={intl.formatMessage(
                      messages.lastNameLabel as MessageDescriptor
                    )}
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    autoComplete="lname"
                    fullWidth
                    required
                  />
                </Grid>
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
                      <FormattedMessage {...messages.signUpButton} />
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item className={classes.social}>
                  <Typography component="span" className={classes.socialSpan}>
                    <FormattedMessage {...messages.orUseSocialSignUp} />
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

              <Grid container justify="center">
                <Grid item>
                  <Link
                    component={MaterialRouterLink}
                    to="/signIn"
                    variant="body2"
                  >
                    <FormattedMessage
                      {...messages.alreadyHaveAnAccountQuestion}
                    />
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

const mapDispatchToProps = { setAuthUser };

export default compose<any>(
  withFirebase,
  withSnackbar,
  connect(null, mapDispatchToProps)
)(withStyles(styles)(SignUp));
