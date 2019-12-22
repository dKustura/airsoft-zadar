import React, { useState } from 'react';
import { compose } from 'redux';
import { Formik, Form } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router';
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
  FormControlLabel,
  Checkbox,
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

interface Props
  extends WithStyles<typeof styles>,
    WithFirebaseProps,
    RouteComponentProps,
    WithSnackbarProps {}

const SignIn: React.FC<Props> = ({
  classes,
  firebase,
  history,
  enqueueSnackbar,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          initialValues={INITIAL_SIGNIN_FORM_VALUES}
          onSubmit={(values, actions) => {
            setIsLoading(true);

            // firebase
            //   .doCreateUserWithEmailAndPassword(values.email, values.password)
            //   .then(credentials => {
            //     console.log('credentials', credentials);
            //     enqueueSnackbar(
            //       'You signed up successfully!',
            //       successNotification
            //     );
            //     history.push('/');
            //   })
            //   .catch((error: FirebaseError) => {
            //     setIsLoading(false);
            //     actions.setSubmitting(false);
            //     enqueueSnackbar(error.message, errorNotification);
            //   });
          }}
          render={({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
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
                    label="Password"
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
                    fullWidth
                  >
                    {isLoading ? (
                      <CircularProgress
                        color="secondary"
                        size={24}
                        thickness={6}
                      />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item className={classes.social}>
                  <Typography component="span" className={classes.socialSpan}>
                    or login with social media
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
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component={MaterialRouterLink}
                    to="/signUp"
                    variant="body2"
                  >
                    Don't have an account?
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
        />
      </div>
    </Container>
  );
};

export default compose<any>(
  withFirebase,
  withRouter,
  withSnackbar
)(withStyles(styles)(SignIn));
