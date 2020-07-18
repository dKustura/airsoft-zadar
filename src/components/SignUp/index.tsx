import * as React from 'react';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useFirebase } from 'components/Firebase';
import { useSnackbar } from 'notistack';

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

// Helpers
import { useStyles } from './styles';
import { INITIAL_SIGNUP_FORM_VALUES } from './constants';
import { successNotification, errorNotification } from 'helpers/snackbar';
import { MaterialRouterLink } from 'helpers';
import { selectAuthUser, selectLocale } from './selectors';
import { Routes } from 'helpers/constants';

// Types
import { FirebaseError } from 'firebase';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';
import messages from './messages';
import { RootState } from 'types';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const SignUp: React.FC<Props> = ({ setAuthUser, authUser, locale }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const intl = useIntl();
  const firebase = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (authUser) {
      history.push(Routes.HOME);
    }
    // eslint-disable-next-line
  }, []);

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
              .then((credentials) => {
                credentials.user
                  ?.updateProfile({
                    displayName: `${values.firstName} ${values.lastName}`,
                  })
                  .then(() => {
                    setAuthUser(credentials.user);
                    enqueueSnackbar(
                      intl.formatMessage(
                        messages.signedUpSuccessfully as MessageDescriptor
                      ),
                      successNotification
                    );

                    firebase.doSendEmailVerification(locale);
                    history.push(Routes.EMAIL_CONFIRMATION);
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
                    to={Routes.SIGN_IN}
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

const mapStateToProps = (state: RootState) => {
  return {
    authUser: selectAuthUser(state),
    locale: selectLocale(state),
  };
};

const mapDispatchToProps = { setAuthUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
